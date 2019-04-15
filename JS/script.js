/* set out our project in modules 
We will use three modules for the entire project.
Each IIFE function written below represents each of the module
Note that the controller module ties the quizController and the UIController modules together*/

/******************************************************** */
/*********************QUIZ CONTROLLER******************** */
/******************************************************** */
let quizController = (function(){
    /* let privateNum = 10;

     let privateFn = function(a){
         return a + privateNum;
     }

     return {
         publicMethod : function(b){
             return b + privateFn(25);
         }
     } 
     localStorage.setItem('data', JSON.stringify([1,2,3,4]));
     console.log(typeof (localStorage.getItem('data')));
     console.log(JSON.parse(localStorage.getItem('data')));
     localStorage.removeItem('data')
     console.log(JSON.parse(localStorage.getItem('data')));
     */

    //  QUESTION CONSTRUCTOR

    function Question(id, questionText, options, correctAnswer){
        this.id = id;
        this.questionText = questionText;
        this.options =options;
        this.correctAnswer = correctAnswer;
    }
    
    let questionLocalStorage = {
        setQuestionCollection: function(newCollection){
            localStorage.setItem('questionCollection', JSON.stringify(newCollection));
        },
        getQuestionCollection: function(){
            return JSON.parse(localStorage.getItem('questionCollection'))
        },
        removeQuestionCollection: function(){
            localStorage.removeItem('questionCollection');
        }
    }
    return{
        addQuestionOnLocalStorage:  function(newQuestionText, opts){
            let optionsArr, corrAns, questionId, newQuestion, getStoredQuests, isChecked;

            if(questionLocalStorage.getQuestionCollection() === null){
                questionLocalStorage.setQuestionCollection([]);
            }

            optionsArr = [];
            isChecked = false;
            // questionId = 0;

            for(let i=0; i<opts.length; i++){
                if(opts[i].value !==''){
                    optionsArr.push(opts[i].value);
                }

                if(opts[i].previousElementSibling.checked && opts[i].value !== '' ){
                    corrAns = opts[i].value;
                    isChecked = true;
                }
            }

            if(questionLocalStorage.getQuestionCollection().length > 0){
                questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
            } else{
                questionId = 0;
            }
            
            if(newQuestionText.value !==""){
                if(optionsArr.length>1){
                    if(isChecked){
                        newQuestion = new Question(questionId, newQuestionText.value, optionsArr, corrAns)

                        getStoredQuests = questionLocalStorage.getQuestionCollection();

            //getStoredQuests.push(newQuestion);

                        questionLocalStorage.setQuestionCollection(getStoredQuests);

                        newQuestionText.value = "";

                        for(let x=0; x<opts.length; x++){
                            opts[x].value = "";
                            opts[x].previousElementSibling.checked = false;
                        }

                        console.log(questionLocalStorage.getQuestionCollection());
                    }   
                    else{
                        alert('you missed to check the correct answer');
                    }
                }
                else{
                    alert('insert at least two options');
                }
            }
            else{
                alert('please insert question');
            }
        }
    };
})();

/******************************************************** */
/*********************UI CONTROLLER******************** */
/******************************************************** */

let UIController = (function(){
    // var num1 = 30;

    // return{
    //     sum : function(num2){
    //         return num1 + num2;
    //     }
    // }
    let domItems = {
        // Admin panel elements
        questionInsertBtn: document.getElementById('question-insert-btn'),
        newQuestionText: document.getElementById('new-question-text'),
        adminOptions: document.querySelectorAll('.admin-option'),
        adminOptionsContainer: document.querySelector('.admin-options-container')
    }

    return{
        getDomItems: domItems,

        addInputDynamically: function(){

            let addInput = function(){
                let inputHTML, z;

                z = document.querySelectorAll('.admin-option').length;

                inputHTML = '<div class="admin-option-wrapper"><input type="radio" class="admin-option-"'+ z + 'name="answer" value=" '+ z +'"><input type="text" class="admin-option admin-option-" ' + z +' value=""></div>';

                domItems.adminOptionsContainer.insertAdjacentHTML('beforeend', inputHTML);

                domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus', addInput);
                domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
            }

            domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
            
        }
    }
})();


/******************************************************** */
/**************************CONTROLLER******************** */
/******************************************************** */
let controller = (function(quizCtrl, UICtrl){
    let selectedDomItems = UICtrl.getDomItems;     // In order to keep the code clean and make things simple, since we'll be referencing UICtrl.getDomItems many times, it is better to have it as a variable and just always call it when needed.

    UICtrl.addInputDynamically();
    selectedDomItems.questionInsertBtn.addEventListener('click', function(){

        let adminOptions =document.querySelectorAll('.admin-option');
        quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, selectedDomItems.adminOptions)
    })
    // console.log(UIController.sum(100) + quizController.publicMethod(3));
})(quizController, UIController);