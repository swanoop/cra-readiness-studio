# Contributing to CRA Assurance Workbench

Contributions should maintain the distinction between a user-recorded claim, independently reviewed evidence and a
legal determination. Do not describe checklist completeness as a conformity result.

1. Open an issue with a fictional reproducible example; avoid real client data.
2. Keep requirement IDs and workspace schema behaviour stable. Migrations must preserve old data and not silently change decisions.
3. Keep the runtime offline, with no undisclosed network calls or telemetry.
4. Run `npm test` and `node --check` for changed JavaScript files.
5. Add regression tests for parsing, deadlines, backups, exports, escaping and user workflows.
6. Regulatory text changes must cite authoritative legal provisions and identify the review date.
7. Use clear, non-templated prose for assessor questions and control guidance.

Do not submit code that asserts automatic certification, regulatory filing or complete standards conformity.
