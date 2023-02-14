//const contentsPath='json/todo.json';
loadEvents();
// load every event in the page
function loadEvents(){
  //document.querySelector('form').addEventListener('submit',submit);
    // recently added
    document.getElementById('clear').addEventListener('click',clearList);
    document.querySelector('ul').addEventListener('click',deleteOrTick);
}

// add tasks
let editValueButton = document.querySelector('button');
let demoContainer=document.querySelector('.main');
if(editValueButton.value!='')
{
  addTask(editValueButton.value);
}
var backdrop;
var modal;
var pageCounter = 1; 
var btnCounter = 1;

var outputParagraph = document.querySelector('#quote');
// var textEdit = document.querySelector('.modal textarea');

var quote = 'Add To-Do tasks';
var editedQuote = '';
var editedDesc='';
var editedDate='';
var showback;
var showModal;


function closeModal() {
  if (backdrop) {
    backdrop.remove();
  }

  if (modal) {
    modal.remove();
  }
}


function addContentTask(content){
  for(var i=0;i<content.length;i++)
  {
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  
  li.innerHTML = `<span class="delete">×</span><input type="checkbox"><label>${content[i].title}</label> 
  <button class="showIcon" onclick="appendDesc('${content[i].title}','${content[i].desc}','${content[i].date}')">
  <img src="https://img.icons8.com/cute-clipart/64/000000/more-or-equal.png" class="showIcon"></button>`;
  ul.appendChild(li);
  
  document.querySelector('.tasksBoard').style.display = 'block';
  }
} 

var seeMore=document.querySelector('.showIcon');
if(seeMore){
seeMore.addEventListener('click', function() { 
  appendDesc(title,desc,date);
});
}
function appendDesc(title,desc,date)
{
 
  backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    backdrop.addEventListener('click', closeModal);
    document.body.insertBefore(backdrop, demoContainer);
    backdrop.addEventListener('click', closeModal);
  
    modal = document.createElement('div');
    modal.classList.add('modal');
  
    var modalHeading = document.createElement('h1');
    modalHeading.textContent = 'To Do List item details';
    modal.appendChild(modalHeading);
  
    var textEditContainer = document.createElement('div');
    textEditContainer.classList.add('modal-input');
    modal.appendChild(textEditContainer);
  
  
  
    var inputArea = document.createElement('textarea');
    inputArea.rows="1";
    inputArea.value=title;
    // inputArea.addEventListener('textarea', function() {
    //   editedQuote = inputArea.value;
    // });
    // inputArea.value = editedQuote;
    textEditContainer.appendChild(inputArea);
  
   
    var textArea = document.createElement('textarea');
    textArea.rows="3";
    textArea.value=desc;
  /*   textArea.addEventListener('textarea', function() {
      editedDesc = textArea.value;
    });
    textArea.value = editedDesc; */
    textEditContainer.appendChild(textArea);

    var textDate = document.createElement('textarea');
    textDate.rows="1";
    textDate.value=date;
/*     textDate.addEventListener('textarea', function() {
      editedDate = textDate.value;
    });
    textDate.value = editedDate; */
    textEditContainer.appendChild(textDate);
  
    var modalActionsContainer = document.createElement('div');
    modalActionsContainer.classList.add('modal-actions');
    modal.appendChild(modalActionsContainer);
  
    var cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.classList.add('btn-cancel');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', closeModal);
    modalActionsContainer.appendChild(cancelButton);
  
   /*  var confirmButton = document.createElement('button');
    confirmButton.setAttribute('type', 'button');
    confirmButton.classList.add('btn-confirm');
    confirmButton.textContent = 'Confirm';
    confirmButton.addEventListener('click', function() {
      if(inputArea.value != '')
      {
      addTask(inputArea.value, textArea.value,textDate.value);}
      else{
      inputArea.value = '';}
      closeModal();
      
    }); */
    // modalActionsContainer.appendChild(confirmButton);
  
    document.body.insertBefore(modal, demoContainer);


  

}
function clearList(e){
    // setting the ul innerHML to an empty string
    let ul = document.querySelector('ul').innerHTML = '';
  }
  // deleteTick
function deleteOrTick(e){
    if(e.target.className == 'delete')
      deleteTask(e);
    else {
      tickTask(e);
    }
  }
  
  // delete task
  function deleteTask(e){
    let remove = e.target.parentNode;
    let parentNode = remove.parentNode;
    parentNode.removeChild(remove);
  }
  
  // tick a task
  function tickTask(e){
    const task = e.target.nextSibling;
    if(e.target.checked){
      task.style.textDecoration = "line-through";
      task.style.color = "#ff0000";
    }else {
      task.style.textDecoration = "none";
      task.style.color = "#2f4f4f";
    }
  }


    editValueButton.addEventListener('click', function() {
    backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    backdrop.addEventListener('click', closeModal);
    document.body.insertBefore(backdrop, demoContainer);
    backdrop.addEventListener('click', closeModal);
  
    modal = document.createElement('div');
    modal.classList.add('modal');
  
    var modalHeading = document.createElement('h1');
    modalHeading.textContent = 'Add To Do List item';
    modal.appendChild(modalHeading);
  
    var textEditContainer = document.createElement('div');
    textEditContainer.classList.add('modal-input');
    modal.appendChild(textEditContainer);
  
  
  
    var inputArea = document.createElement('textarea');
    inputArea.rows="1";
    inputArea.placeholder="Title";
    inputArea.addEventListener('textarea', function() {
      editedQuote = inputArea.value;
    });
    inputArea.value = editedQuote;
    textEditContainer.appendChild(inputArea);
  
   
    var textArea = document.createElement('textarea');
    textArea.rows="3";
    textArea.placeholder="Description";
    textArea.addEventListener('textarea', function() {
      editedDesc = textArea.value;
    });
    textArea.value = editedDesc;
    textEditContainer.appendChild(textArea);

    var textDate = document.createElement('textarea');
    textDate.rows="1";
    textDate.placeholder="Date";
    textDate.addEventListener('textarea', function() {
      editedDate = textDate.value;
    });
    textDate.value = editedDate;
    textEditContainer.appendChild(textDate);
  
    var modalActionsContainer = document.createElement('div');
    modalActionsContainer.classList.add('modal-actions');
    modal.appendChild(modalActionsContainer);
  
    var cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.classList.add('btn-cancel');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', closeModal);
    modalActionsContainer.appendChild(cancelButton);
  
    var confirmButton = document.createElement('button');
    confirmButton.setAttribute('type', 'button');
    confirmButton.classList.add('btn-confirm');
    confirmButton.textContent = 'Confirm';
    confirmButton.addEventListener('click', function() {
      if(inputArea.value != '')
      {
        addTask(inputArea.value, textArea.value,textDate.value);
    }
      else{
      inputArea.value = '';}  
      closeModal();
      
    });
    modalActionsContainer.appendChild(confirmButton);
  
    document.body.insertBefore(modal, demoContainer);
  
  
  });

  function addTask(title,desc,date){
   
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    
    li.innerHTML = `<span class="delete">×</span><input type="checkbox"><label>${title}</label> 
    <button class="showIcon" onclick="appendDesc('${title}','${desc}','${date}')">
    <img src="https://img.icons8.com/cute-clipart/64/000000/more-or-equal.png" class="showIcon"></button>`;
    ul.appendChild(li);
    
    document.querySelector('.tasksBoard').style.display = 'block';
    
  } 
  
  const xhr= new XMLHttpRequest();
  xhr.open('GET',contentsPath);
  console.log(contentsPath);
  xhr.addEventListener('load',(event)=>
  {
     const contents=JSON.parse(event.target.responseText);
     console.log(contents);
     addContentTask(contents);
  });
  
  xhr.send()