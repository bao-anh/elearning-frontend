const aaa = [
    {
        id: 1,
        value: 2
    }, 
    {
        id: 2, 
        value: 34
    }
]

let objArray = [ {a:1} , {b:2} ];

let refArray = objArray; // this will just point to the objArray
let clonedArray = objArray.map(item => Object.assign({},item)); // will clone the array

console.log(objArray[0] === clonedArray[0])

objArray[0] = {a:3};

class TestSettingTest {
    constructor(props) {
        this.examId = props.examId ? props.examId: 123;
        this.instanceFeedback = props.instanceFeedback ? props.instanceFeedback:  false;
        this.totalQuestion = props.totalQuestion ? props.totalQuestion:  50;
        this.allowMistake = props.allowMistake ? props.allowMistake : 10;
        this.contentTest = props.contentTest ? props.contentTest:  []
    }
    static init() {
        return new TestSettingTest({});
    }

    toJS() {
        return {
            examId: this.examId,
            instanceFeedback: this.instanceFeedback,
            questionsNumber: this.totalQuestion,
            mistakesNumber: this.allowMistake,
            contentTest: this.contentTest
        }
    }
}

var x =  TestSettingTest.init();
console.log("XXXX", x);