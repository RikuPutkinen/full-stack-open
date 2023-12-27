sequenceDiagram
    participant browser as b
    participant server as s

    b->>+s: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    s-->>-b: 201, {"message": "note created"}