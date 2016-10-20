//MODEL

function Model(data) {
    var self = this;
    self.data = data;

    self.addItem = function(item) {
        self.data.push(item);
        if(item.length === 0){
            return
        }
        return self.data;
    }

    self.removeItem = function(item) {
        var index = self.data.indexOf(item);
        if(index === -1){
          return
        }
        self.data.splice(index, 1);
        return(self.data);
    }

    self.editItem = function(item, newItem) {
        var index = self.data.indexOf(item);
        if(index === -1){
          return
        }
        self.data.splice(index, 1, newItem);
        return(self.data);
    }
};

//VIEW

function View(model) {
    var self = this;

    init = function () {
        var wrapper = tmpl($('#wrapper-template').html());
        $('body').append(wrapper);

        self.elements = {
            input: $('.item-value'),
            addBtn: $('.item-add'),
            listContainer: $('.item-list'),
        };

    self.renderList(model.data);
    };

    self.renderList = function (data) {
        var list = tmpl($('#list-template').html(), {data:data});
        self.elements.listContainer.html(list);
    };

    init();
};

//CONTROLLER

function Controller(model, view) {
    var self = this;

    view.elements.addBtn.on('click', addItem);

    view.elements.input.keypress(function (e) {
      if(e.which == 13){
          addItem();
      }
    });
    view.elements.listContainer.on('click', '.item-delete', removeItem);
    view.elements.listContainer.on('click','.display-item', editItem);

    function addItem(){
        var newItem = view.elements.input.val();

        if(newItem.length === 0){
          return
        } 

        model.addItem(newItem);
        view.renderList(model.data);
        view.elements.input.val('');
    };
  
    function removeItem() {
        var item = $(this).attr('data-value');
        model.removeItem(item);
        view.renderList(model.data);
    };

    function editItem() {
        var item = $(this).attr('data-b');
        var index = $('.display-item').index(this);
        var editItem = $('.display-item').eq(index);
        var editItemInput = $('.edit').eq(index);
        var newItem = editItem.html(); 
               
                      
        model.removeItem(item);
        view.elements.input.val(item);
        view.renderList(model.data);     
     

        editItemInput.keypress(function(e) {
            if(e.which === 13){                              
                editItemInput.hide();
                editItem.html(editItemInput.val());
                editItem.show();
                newItem = editItem.html();
                model.editItem(item, newItem);
                view.renderList(model.data);
            }
        });

        editItemInput.focusout(function(){             
            editItemInput.hide();
            editItem.html(editItemInput.val());
            editItem.show();
            newItem = editItem.html();
            model.editItem(item, newItem);
            view.renderList(model.data);
        });
      };
};
      

// function() {
    $(function(){
        var list = ['Покормить кота', 'Забрать ребенка из школы', 'Сделать ДЗ 23-24', 'Освободить Донбасс и Крым'];        
        var model = new Model(list);
        var view = new View(model);
        var controller = new Controller(model, view);
    });
// };