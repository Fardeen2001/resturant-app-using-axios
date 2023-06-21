let form = document.getElementById("form")
let table1 = document.getElementById("table1")
let table2 = document.getElementById("table2")
let table3 = document.getElementById("table3")

let Details=[];

form.addEventListener("submit",addtabledetails)
async function detail(){
    try{
        let response = await axios.get("https://crudcrud.com/api/3f164e0a2d174628943a77d04ca99f75/orders")
        Details = response.data;
        display();
    }

    catch(err)  {
        console.log("Something went wrong:", err);
        document.body.innerHTML="<h4>Something went wrong</h4>"
    };
}


function display(){
    table1.innerHTML=""
    table2.innerHTML=""
    table3.innerHTML=""
    Details.forEach(detail=>{
        if(detail.dishtable=="Table 1"){
            let li = document.createElement("li");
            li.className="list-group-item";
            li.innerHTML=`${detail.dishname}-${detail.dishprice}-${detail.dishtable}<button type="button" class="btn btn-danger btn-sm btndelete float-end" onclick="deletetabledetails('${detail._id}')">Delete</button>`
            table1.appendChild(li)
        }
        else  if(detail.dishtable=="Table 2"){
            let li = document.createElement("li");
            li.className="list-group-item";
            li.innerHTML=`${detail.dishname}-${detail.dishprice}-${detail.dishtable}<button type="button" class="btn btn-danger btn-sm btndelete float-end" onclick="deletetabledetails('${detail._id}')">Delete</button>`
            table2.appendChild(li)
        }
        else{
            let li = document.createElement("li");
            li.className="list-group-item";
            li.innerHTML=`${detail.dishname}-${detail.dishprice}-${detail.dishtable}<button type="button" class="btn btn-danger btn-sm btndelete float-end" onclick="deletetabledetails('${detail._id}')">Delete</button>`
            table3.appendChild(li)
        }
    })
}

async  function addtabledetails(e){
    e.preventDefault();
    let dishname = document.getElementById("validationDefault01").value;
    let dishprice = document.getElementById("validationDefault02").value;
    let dishtable = document.getElementById("validationDefault03").value;

    let tableDetails = {
        "dishname": dishname,
        "dishprice": dishprice,
        "dishtable": dishtable
    };
    try{
    let response = await axios.post("https://crudcrud.com/api/3f164e0a2d174628943a77d04ca99f75/orders", tableDetails);
        tableDetails._id = response.data._id;
        Details.push(tableDetails);
        display();
        form.reset();
    }catch(err){
        console.log("Something went wrong:", err);
        document.body.innerHTML="<h4>Something went wrong</h4>"
    };

}
async function deletetabledetails(dishid) {
    try{
    await axios.delete(`https://crudcrud.com/api/3f164e0a2d174628943a77d04ca99f75/orders/${dishid}`)
            for (let i = 0; i < Details.length; i++) {
                if (Details[i]._id === dishid) {
                  Details.splice(i, 1);
                  break;
                }
              }
            display()
        }
        catch(err){
            console.log("Something went wrong:", err);
            document.body.innerHTML="<h4>Something went wrong</h4>"
        };
}
detail()
