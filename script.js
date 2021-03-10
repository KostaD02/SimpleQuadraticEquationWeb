'use strict';
class kvg {
	constructor(a = 1, b = 0, c = 0) {
		this.set(a, b, c);
	}
	set(a, b, c) {
		this.setA(a);
		this.setB(b);
		this.setC(c);
	}
	Check_coeff(X) {
		return (Number.isFinite(X)) ? true : false;
	}
	setA(a = 1) {
		if (this.Check_coeff(a)) {
			if (a != 0) {
				this.a = a;
			} else {
				this.a = 1;
			}
		} else {
			this.a = 1;
		}
	}
	setB(b = 0) {
		if (this.Check_coeff(b)) {
			this.b = b;
		} else {
			this.b = 0;
		}
	}
	setC(c = 0) {
		if (this.Check_coeff(c)) {
			this.c = c;
		} else {
			this.c = 0;
		}
	}
	showA() {
		return this.a;
	}
	showB() {
		return this.b;
	}
	showC() {
		return this.c;
	}
	D() {
		return this.b ** 2 - 4 * this.a * this.c;

	}
	Re() {
		return -this.b / (2 * this.a);
	}
	Im() {
		return Math.sqrt(Math.abs(this.D())) / (2 * this.a);
	}

	Display_Root(k = 0) {
		let Rez = [];
		if (this.D() >= 0) {
			Rez.push(this.Re() - this.Im());
			Rez.push(this.Re() + this.Im());
		} else {
			Rez.push(this.Re() + "-i*" + this.Im());
			Rez.push(this.Re() + "+i*" + this.Im());
		}
		if (k < 0) return Rez[0];
		else if (k > 0) return Rez[1];
		else return Rez;
	}
}

function DisplayEQ(MyEq, ch = "X") {
	let Rez = "";
	if (MyEq.showA() == -1) Rez += "-";
	else if (MyEq.showA() != 1) Rez += MyEq.showA();
	Rez += " " + ch + "<sup>2</sup>";

	if (MyEq.showB() == -1) Rez += "-";
	else if (MyEq.showB() == 1) Rez += "+";
	else if (MyEq.showB() > 0) Rez += "+" + MyEq.showB();
	else if (MyEq.showB() < 0) Rez += MyEq.showB();
	if (MyEq.showB() != 0) Rez += "*" + ch;

	if (MyEq.showC() > 0) Rez += "+" + MyEq.showC();
	else if (MyEq.showA() < 0) Rez += MyEq.showB();
	Rez += "=0";
	return Rez;
}


function clearArea(getID) {
	let Noode = document.getElementById(getID);
	while (Noode.hasChildNodes()) {
		Noode.removeChild(Noode.lastChild);
	}
}
function createArea(outPutID, textID) {
	let container = document.createElement('TEXTAREA');
	clearArea(outPutID);
	container.id = textID;
	document.getElementById(outPutID).appendChild(container);
}
function getRoots(inputID, outPut) {
	clearArea(outPut);
	let input = document.getElementById(inputID).value;
	let splitArray = [...input.split('\n')];
	let arr = [];
	splitArray.forEach(num => arr.push(num.split(' ')));
	let Rez = [];
	for (let i = 0; i < arr.length; i++) {
		let TMPE = [];
		arr[i].forEach(function (num) {
			if (Number.isFinite(parseFloat(num))) TMPE.push(parseFloat(num));
		});
		let mykvg = new kvg(parseFloat(TMPE[0]), parseFloat(TMPE[1]), parseFloat(TMPE[2]));
		TMPE = [];
		TMPE.push(mykvg.Display_Root(-1));
		TMPE.push(mykvg.Display_Root(1));
		Rez.push(TMPE);
		document.getElementById(outPut).innerHTML += "#" + (i + 1) + " Equation:" + DisplayEQ(mykvg, "X") + "<br>x<sub>1</sub>= " + Rez[i][0] + "<br>x<sub>2</sub>= " + Rez[i][1] + "<br><br>";
	}
	return Rez;
}


