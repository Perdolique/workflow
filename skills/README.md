# Personal agent skills

Browse the [skill catalog](../README.md#skills) and follow the [installation guide](../README.md#using-skills).

## Contributing

See the [repository instructions](../AGENTS.md) and [instructions-master](instructions-master/SKILL.md) for authoring guidance.

## Local validation

Install `skill-validator` with Homebrew:

```bash
brew tap agent-ecosystem/tap
brew install skill-validator
```

Or install it with Go:

```bash
go install github.com/agent-ecosystem/skill-validator/cmd/skill-validator@latest
```

Run the validator from the repository root:

```bash
pnpm run lint:skills
```

## License

Unlicense, unless a skill states otherwise.
