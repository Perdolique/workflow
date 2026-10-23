// Selected existing configuration and installation discovery code.
function readGitHubConfiguration(bindings: RelayBindings): GitHubConfiguration | null {
  const appId = bindings.GITHUB_APP_ID.trim()
  const privateKey = bindings.GITHUB_APP_PRIVATE_KEY?.trim()

  if (appId.length === 0 || privateKey === undefined || privateKey.length === 0) {
    return null
  }

  if (!/^[1-9]\d*$/u.test(appId)) {
    throw new Error('GitHub App ID must be a positive integer')
  }

  return {
    appId,
    privateKey
  }
}


// Inside readGitHubInventory:
const discoveryPath = `https://api.github.com/orgs/${githubOrganization}/installation`
  const installationResponse = await githubRequest(discoveryPath, jwt, { allowMissing: true })

  if (installationResponse.status === 404) {
    return {
      status: 'not_installed',
      installationId: null,
      installationUrl: null,
      repositories: []
    }
  }

  const installationBody: unknown = await installationResponse.json()
  const installation = parse(installationSchema, installationBody)
  const account = installation.account.login.toLowerCase()
  const expectedAccount = githubOrganization.toLowerCase()
  const appId = String(installation.app_id)

  if (account !== expectedAccount || appId !== configuration.appId) {
    throw new Error('GitHub installation does not belong to this workspace and App')
  }

  const installationId = String(installation.id)
  const installationUrl = `https://github.com/organizations/${githubOrganization}/settings/installations/${installationId}`

  if (installation.suspended_at !== null) {
    throw new Error('GitHub App installation is suspended')
  }

  if (installation.repository_selection !== 'selected') {
    return {
      status: 'selection_required',
      installationId,
      installationUrl,
      repositories: []
    }
  }

  const tokenPath = `https://api.github.com/app/installations/${installationId}/access_tokens`

  // Listing installation repositories requires no repository permissions.
