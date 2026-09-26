# Cleanup rules

A file-local wrapper around one native string method needs a separate responsibility or more than one caller. When neither exists, put the native call directly in its caller. Preserve the returned value and any fallback behavior.
