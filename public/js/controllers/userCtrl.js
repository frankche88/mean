angular.module('pokeApp.userCtrl',[])
.controller('userCtrl',function(userService,LxDialogService, LxNotificationService){
  var vm = this;

  vm.dialogId = 'dialog-test';
  vm.dialogIdEdit = 'dialog-edit';

  vm.infoUser = {};

  vm.add = function(){

      LxDialogService.open(vm.dialogIdEdit);

  }

  var getUsers = function() {

      userService.all().then(
          function(response) {
              vm.users = response;
          },
          function(response) {

          });
  };

  vm.search = function(){

    userService.search(vm.searchUser).then(
        function(response) {
            vm.users = response;
        },
        function(response) {

        });
  };

  vm.openDialog = function(id){

    userService.get(id).then(
        function(response) {
            vm.infoUser = response;
            LxDialogService.open(vm.dialogId);
        },
        function(response) {

        });
  }


  getUsers();
});
