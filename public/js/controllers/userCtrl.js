angular.module('pokeApp.userCtrl', [])
    .controller('userCtrl', function(userService, LxDialogService, LxNotificationService) {
        var vm = this;

        vm.dialogId = 'dialog-test';
        vm.dialogIdEdit = 'dialog-edit';

        vm.infoUser = {};
        vm.model = {};
        vm.add = function() {
            vm.model = {};
            LxDialogService.open(vm.dialogIdEdit);

        }

        vm.edit = function(id) {

            userService.get(id).then(
                function(response) {
                    vm.model = response;
                    LxDialogService.open(vm.dialogIdEdit);
                },
                function(response) {

                });
        };

        var getUsers = function() {

            userService.all().then(
                function(response) {
                    vm.users = response;
                },
                function(response) {

                });
        };

        vm.search = function() {

            userService.search(vm.searchUser).then(
                function(response) {
                    vm.users = response;
                },
                function(response) {

                });
        };

        vm.save = function(model) {

            if (!model._id) {
                userService.create(model).then(
                    function(response) {
                        LxDialogService.close(vm.dialogIdEdit);
                        getUsers();
                    },
                    function(response) {

                    });
            } else {

                userService.update(model).then(
                    function(response) {
                        LxDialogService.close(vm.dialogIdEdit);
                        getUsers();
                    },
                    function(response) {

                    });
            }

        };

        vm.openDialog = function(id) {

            userService.get(id).then(
                function(response) {
                    vm.infoUser = response;
                    LxDialogService.open(vm.dialogId);
                },
                function(response) {

                });
        }

        vm.delete = function(id) {

            userService.delete(id).then(
                function(response) {
                    getUsers();
                },
                function(response) {

                });
        };

        getUsers();
    });
