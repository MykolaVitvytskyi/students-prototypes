function Student(name, age){
	this.name = name;
	this.age = age;
	this.marks = [];
}

Student.prototype.addMark = function(lessonNumber, mark ){
	this.marks[lessonNumber] = mark;
}

Student.prototype.getAverageMark = function(){
	return this.marks.reduce(function(prev, next){
		return (prev + next);
	}, 0) / this.marks.length;
}

var kolya = new Student('Kolya', 20);
var julia = new Student('Julia', 25);
var andrew = new Student('Andrew', 30);

function Group(){
	this.push.apply(this, arguments);
}

Group.prototype = Object.create(Array.prototype);

Group.prototype.addStudent = function(stud){
	this.push(stud);
}

Group.prototype.getStudentName = function(name){
	return this.find(function(elem){
		return elem.name === name;
	});
}

Group.prototype.removeStudent = function(name){
	var i = this.findIndex(function(elem){
		return elem.name === name;
	});
	if (i != -1){
		this.splice(i, 1);
	}
}

Group.prototype.getAverageLessonMark = function(lessonNumber){
	return this.reduce(function(prev, next){
        return (prev + next.marks[lessonNumber]);
      }, 0) / this.length;
}

Group.prototype.sortStudentsByName = function(){
	return this.sort(function(a,b){
		return a.name > b.name ? 1 : -1;
	})
}

Group.prototype.sortStudentsByMarks = function(){
	return this.sort(function(a,b){
		return a.getAverageMark() < b.getAverageMark() ? 1 : -1;
	})
}

var group = new Group(kolya, julia, andrew);

var oleg = new Student('Oleg', 18);
group.addStudent(oleg);

group.removeStudent('Kolya');

julia.addMark(0, 3);
julia.addMark(1, 7);
andrew.addMark(0, 10);
andrew.addMark(1, 8);
oleg.addMark(0, 7);
oleg.addMark(1, 9);

console.log(andrew.getAverageMark());
console.log(group.getAverageLessonMark(1));

console.log(group.sortStudentsByName());
console.log(group.sortStudentsByMarks());

console.log(group.filter(function(stud){
	return stud.marks[0] === 10
}));
