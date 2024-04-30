# tododis-script

Simple HTML/JS tool to automate task and subtask creation using Todoist REST API

## Introduction

This simple HTML form will be used to create a "task" in Todoist for the onboarding client.

Each client "parent task" will have "subtasks" for each step of the onboarding process.

## Setup

To get started, download the `tododis.html` file to your local machine.

The HTML file has `***` placeholder values that need to be updated.

```html
<h2>API Settings</h2>
<label>
    <span>API Key</span>
    <input class="api-key" disabled value="***"></input>
</label>
<label>
    <span>Project ID</span>
    <input class="project-id" disabled value="***"></input>
</label>
<label>
    <span>Section ID</span>
    <input class="section-id" disabled value="***"></input>
</label>
```

Your personal **API Key*** for Todoist may be found here:
https://app.todoist.com/app/settings/integrations/developer

Your project and section IDs may be found by clicking "Copy project link" or "Copy link to section" in the Todoist application.
