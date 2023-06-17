let form = document.getElementById("form")
let table1 = document.getElementById("table1")
let table2 = document.getElementById("table2")
let table3 = document.getElementById("table3")

let Details=[];

form.addEventListener("submit",addtabledetails)
axios.get("https://crudcrud.com/api/57b361f3d28448d795116a63fbd1a16d/orders")
    .then(response => {
        Details = response.data;
        display();
    })
    .catch(err => {
        console.log("Something went wrong:", err);
        document.body.innerHTML="<h4>Something went wrong</h4>"
    });

function display(){
    table1.innerHTML=""
    table2.innerHTML=""
    table3.innerHTML=""
    Details.forEach(detail=>{
        if(detail.dishtable=="Table 1"){
            let li = document.createElement("li");
            li.className="list-group-item";
            li.innerHTML=`${detail.dishname}-${detail.dishprice}-${detail.dishtable}<button type="button" class="btn btn-secondary btn-sm btndelete float-end" onclick="deletetabledetails('${detail._id}')">Delete</button>`
            table1.appendChild(li)
        }
        else  if(detail.dishtable=="Table 2"){
            let li = document.createElement("li");
            li.className="list-group-item";
            li.innerHTML=`${detail.dishname}-${detail.dishprice}-${detail.dishtable}<button type="button" class="btn btn-secondary btn-sm btndelete float-end" onclick="deletetabledetails('${detail._id}')">Delete</button>`
            table2.appendChild(li)
        }
        else{
            let li = document.createElement("li");
            li.className="list-group-item";
            li.innerHTML=`${detail.dishname}-${detail.dishprice}-${detail.dishtable}<button type="button" class="btn btn-secondary btn-sm btndelete float-end" onclick="deletetabledetails('${detail._id}')">Delete</button>`
            table3.appendChild(li)
        }
    })
}

function addtabledetails(e){
    e.preventDefault();
    let dishname = document.getElementById("validationDefault01").value;
    let dishprice = document.getElementById("validationDefault02").value;
    let dishtable = document.getElementById("validationDefault03").value;

    let tableDetails = {
        "dishname": dishname,
        "dishprice": dishprice,
        "dishtable": dishtable
    };
    axios.post("https://crudcrud.com/api/57b361f3d28448d795116a63fbd1a16d/orders", tableDetails)
    .then(response => {
        tableDetails._id = response.data._id;
        Details.push(tableDetails);
        display();
        form.reset();
    })
    .catch(err => {
        console.log("Something went wrong:", err);
        document.body.innerHTML="<h4>Something went wrong</h4>"
    });

}
function deletetabledetails(dishid) {
    axios.delete(`https://crudcrud.com/api/57b361f3d28448d795116a63fbd1a16d/orders/${dishid}`)
        .then(response => {
            for (let i = 0; i < Details.length; i++) {
                if (Details[i]._id === dishid) {
                  Details.splice(i, 1);
                  break;
                }
              }
            display();
        })
        .catch(err => {
            console.log("Something went wrong:", err);
            document.body.innerHTML="<h4>Something went wrong</h4>"
        });
}