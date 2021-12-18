# Barco Coding Challenge
by Pablo Higueros

The following project was created as a coding challenge for Barco Rent-A-Truck

## Dependencies:
[Vue.js](https://vuejs.org/) framework.

## How to use:
The project is a very simple task manager with data taken from [JSONPlacehorder](https://jsonplaceholder.typicode.com/).
My code fetches data from their API and first displays the users as follows:

![main](/assets/main.PNG)

Once a user is selected, my code fetches that user's tasks and are displayed as a checklist as follows:

![todos](/assets/todos.PNG)

When a checkbox is checked or unchecked, the task moves to the completed or pending section respectively.
Unfortunately, since we do not change the values in the API, the values are not stored after we exit the to do list.
This is something that can be further explored in the future.
