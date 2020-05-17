class Test {
    name: string;
    age: number;
    constructor({name: string, xxx: number}) {
        this.name = "kiuen";
        this.age = 13;
    }
    static init({name: string, age:number}) : Test {
        return new Test({name, xxx: 1});
    }
}

var xx = Test.init({name: "yyyy", age: 19});
console.log(xx);