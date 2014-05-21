"using strict";
var myApp = {};
myApp.Snacks = [];
myApp.url = "https://domo.firebaseio.com/";
myApp.Snack = function (name, price) {
    this.name = name;
    this.price = price;
};
myApp.AddSnack = function () {
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    myApp.PostSnack(new myApp.Snack(name, price));
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
};
myApp.WriteTable = function () {
    myApp.sortSnacks();
    var holder = "";
    for (var s in myApp.Snacks) {
        holder += myApp.Snacks[s].name +
            " $" + myApp.Snacks[s].price
            + "<button onclick='myApp.DeleteSnack(\"" + myApp.Snacks[s].key + "\")'>Delete</button><br/>";
    }
    document.getElementById('snackList').innerHTML = holder;
};
myApp.GetSnacks = function () {
    var request = new XMLHttpRequest();
    request.open("GET", myApp.url + ".json", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            myApp.Snacks = [];
            var data = JSON.parse(this.response);
            for (var i in data) {
                data[i].key = i;
                myApp.Snacks.push(data[i]);
            }
            console.log(this.response);
            myApp.WriteTable();
        }
        else {
            console.log(this.response);
        }
    };
    request.onerror = function () {
        console.log("Com ERRR on GET")
    }

    request.send();

};
myApp.PostSnack = function (snack) {
    var request = new XMLHttpRequest();
    request.open("Post", myApp.url + ".json", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            console.log(this.response);
            myApp.GetSnacks();
        }
        else {
            console.log(this.response);
        }
    };
    request.onerror = function () {
        console.log("Com ERRRRRRR on POST");
    };
    request.send(JSON.stringify(snack));
};
myApp.DeleteSnack = function (key) {
    var request = new XMLHttpRequest();
    request.open("DELETE", myApp.url +key+ ".json", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
           
            myApp.GetSnacks();
        }
        else {
            console.log(this.response);
        }
    };
    request.onerror = function () {
        console.log("Com ERRRRRRR on POST");
    };
    request.send();
};
myApp.sortSnacks = function () {
    var isDesc = document.getElementById("isDesc").value;
    var sortBy = document.getElementById("sort").value;
    myApp.Snacks.sort(
        function (a, b) {
            if (parseFloat(a[sortBy]) > parseFloat(b[sortBy])) { return 1; }
            else if (parseFloat(a[sortBy]) < parseFloat(b[sortBy])) { return -1; }
            else { return 0; }
        });
    if (isDesc === "true") {
        myApp.Snacks.reverse();
    }
};

myApp.GetSnacks();//Nom Nom Nom