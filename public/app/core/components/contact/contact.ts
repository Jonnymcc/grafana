import coreModule from '../../core_module';
import appEvents from 'app/core/app_events';
import _ from 'lodash';

export class ContactCtrl {
  emails: any;

  /** @ngInject */
  constructor(private backendSrv) {
    this.emails = this.getAdminUsers();
  }

  getAdminUsers() {
    this.backendSrv
      .get(`/api/users/search?isadmin=1`)
      .then(result => {
        var emails = [];
        _.forEach(result.users, function(user) {
            emails.push(user["email"]);
        });
        this.emails = emails;
      });
  }

  dismiss() {
    appEvents.emit('hide-modal');
  }
}

export function contactModal() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/core/components/contact/contact.html',
    controller: ContactCtrl,
    bindToController: true,
    transclude: true,
    controllerAs: 'ctrl',
    scope: {},
  };
}

coreModule.directive('contactModal', contactModal);
