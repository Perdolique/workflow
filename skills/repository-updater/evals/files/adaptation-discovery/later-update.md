# Completed handbook update

The local handbook was updated from Docforge 2.8.0 to 3.1.0. Its one-target build script is unchanged. There are no transitive dependencies. The selected version is permitted by the update policy. Version discovery returned 3.0.0 and 3.1.0 in this interval.

## Verification output

```text
$ ./build.sh
Rendered docs to site/en (language: en)
exit_code=0
$ ./check-links.sh site/en
Broken links: 0
exit_code=0
```

## Additional upstream capture

Request URL: <https://docforge.example/releases/3.1.0>

```http
HTTP/1.1 301 Moved Permanently
Location: https://docforge.example/changelog/3.1.0
Content-Length: 0
```

No response from the destination URL is present in this research bundle. The only rendering guide captured is for 3.0.0, in `upstream.md`.
