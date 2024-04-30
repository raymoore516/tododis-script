function init() {
    const button = document.querySelector('button.submit');
    button.addEventListener('click', onSubmit);
}

function onSubmit() {
    const parent = buildParent();

    console.log("Submitting...");

    submit(parent)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP response was unsuccessful. ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(async data => {
            console.log(`Parent Task: ${data.url}`);
            const subtasks = buildSubtasks(data.id);
            for (let i = 0; i < subtasks.length; i++) {
                const response = await submit(subtasks[i]);
                if (!response.ok) {
                    throw new Error(`HTTP response was unsuccessful. ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                console.log(` > Subtask #${i+1}: ${data.url}`);
            }
            console.log("Complete!");
        })
        .catch(error => {
            console.error('Unexpected Error:', error);
        });
}

// ---

function buildParent() {
    const client = document.querySelector('.client')?.value;
    if (client === undefined) {
        alert("Client name is required");
    }

    const pets = document.querySelector('.pets')?.value;
    const email = document.querySelector('.email')?.value;
    const phone = document.querySelector('.phone')?.value;

    const bean = {};
    bean.content = `Onboarding: ${client}`
    bean.description = `Pet(s): ${pets}\nEmail: ${email}\nPhone: ${phone}`
    bean.project_id = document.querySelector('.project-id')?.value;
    bean.section_id = document.querySelector('.section-id')?.value;

    return bean;
}

function buildSubtasks(id) {
    const subtasks = [];

    document.querySelectorAll('.subtask').forEach(subtask => {
        const bean = {};
        bean.content = subtask.querySelector('.summary')?.innerText;
        bean.description = subtask.querySelector('.description')?.innerText;
        bean.parent_id = id;
        subtasks.push(bean);
    });

    return subtasks;
}

async function submit(bean) {
    const token = document.querySelector('.api-key')?.value;

    const url = "https://api.todoist.com/rest/v2/tasks";
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bean)
    };

    return fetch(url, options);
}

init();