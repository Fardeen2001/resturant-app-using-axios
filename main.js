// Encapsulate the code within an object or module
const app = {
    form: document.getElementById("form"),
    table1: document.getElementById("table1"),
    table2: document.getElementById("table2"),
    table3: document.getElementById("table3"),
    tableDetails: [],
  
    init() {
      this.fetchTableDetails();
      this.form.addEventListener('submit', this.addTableDetails.bind(this));
    },
  
    fetchTableDetails() {
      axios.get("https://crudcrud.com/api/5d7518528c624603968165efac7317a8")
        .then(response => {
          this.tableDetails = response.data;
          this.display();
        })
        .catch(error => {
          console.log(error);
        });
    },
  
    display() {
      this.table1.innerHTML = '';
      this.table2.innerHTML = '';
      this.table3.innerHTML = '';
  
      this.tableDetails.forEach(user => {
        let li = document.createElement('li');
        li.className = "list-group-item";
  
        switch (user.dishtable) {
          case "Table 1":
            li.className += " table1";
            break;
          case "Table 2":
            li.className += " table2";
            break;
          case "Table 3":
            li.className += " table3";
            break;
          default:
            break;
        }
  
        li.innerHTML = `${user.dishname}-${user.dishprice}-${user.dishtable}<button type="button" class="btn btn-secondary btn-sm btndelete float-end" id="del" onclick="app.deleteUser('${user._id}')">Delete</button>`;
        this.getTableElement(user.dishtable).appendChild(li);
      });
    },
  
    addTableDetails(e) {
      e.preventDefault();
      let dishname = document.getElementById("validationDefault01").value;
      let dishprice = document.getElementById("validationDefault02").value;
      let dishtable = document.getElementById("validationDefault03").value;
  
      if (!dishname || !dishprice || !dishtable) {
        alert("Please fill in all fields.");
        return;
      }
  
      let tableobj = {
        "dishname": dishname,
        "dishprice": dishprice,
        "dishtable": dishtable
      };
  
      axios.post(`https://crudcrud.com/api/5d7518528c624603968165efac7317a8/${dishtable}`, tableobj)
        .then(response => {
          tableobj._id = response.data._id;
          this.tableDetails.push(tableobj);
          this.display();
          this.form.reset();
        })
        .catch(error => {
          console.log(error);
        });
    },
  
    deleteUser(userId) {
      axios.delete(`https://crudcrud.com/api/5d7518528c624603968165efac7317a8/${userId}`)
        .then(response => {
          this.tableDetails = this.tableDetails.filter(user => user._id !== userId);
          this.display();
        })
        .catch(error => {
          console.log(error);
        });
    },
  
    getTableElement(tableName) {
      switch (tableName) {
        case "Table 1":
          return this.table1;
        case "Table 2":
          return this.table2;
        case "Table 3":
          return this.table3;
        default:
          return null;
      }
    }
  };
  
  // Initialize the app
  app.init();
  