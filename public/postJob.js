
/* let jsonLength;

fetch('./Jobs.json')
  .then(response => response.json())
  .then(data => {
    jsonLength = data.length;
    console.log(`The length of the JSON file is: ${jsonLength}`);
  })
  .catch(error => {
    console.error(`Error fetching JSON: ${error}`);
  });

console.log(jsonLength); */


function modifyFormData(formData) {

    const max = formData.get('max_salary_input');   // String
    const min = formData.get('min_salary_input');   // String
    const salary = '$' + min + ' - ' + '$' + max + ' per year';

    // add a new key-value pair
    formData.append("salary", salary);
    //formData.append("id",jobs_counter());

    //console.log(jobs_counter());
    // delete a key-value pair
    formData.delete("min_salary_input");
    formData.delete("max_salary_input");


    // modify an existing key-value pair
    const team_data = formData.get('team_size');
    if (!team_data == '') {
        formData.set("team_size", team_data + ' people');
    }

    // set default values for keys which have not been filled in.
    for (let [key, value] of formData) {
        if (value == '') {
            value = "Not set, please contact the company for details.";
            formData.set(key, value);
        }
    }

    return formData;
}



// Test 






const postButton = document.getElementById('postButton');
postButton.addEventListener('click', function (event) {
    event.preventDefault();
    const formData = new FormData(document.querySelector('form'));
    const data = modifyFormData(formData);
    const body = {};
    const id = data.get('id');
    console.log(id);

    for (let [key, value] of data.entries()) {
        body[key] = value;
    }

    fetch('./Jobs.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("New Job posted!");
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });


});


