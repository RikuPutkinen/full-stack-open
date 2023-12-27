```mermaid
sequenceDiagram
    participant b as browser
    participant s as server

    b->>+s: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    s-->>-b: 201, {"message": "note created"}
```