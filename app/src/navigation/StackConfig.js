//Navigation Screens Import
import DaoListScreen from '../screens/DaoListScreen';
import CreateDaoScreen from '../screens/CreateDaoScreen';
import CofounderDetailsScreen from '../screens/CofounderDetailsScreen';
import ReviewScreen from '../screens/ReviewScreen';
import DaoHomeScreen from '../screens/DaoScreens/DaoHomeScreen';
import WalletHomeScreen from '../screens/WalletHomeScreen';
import SendScreen from '../screens/SendScreen';
import CreateProposal from '../screens/CreateProposal';
import ProposalDetailsScreen from '../screens/ProposalDetailsScreen';
// import RestoreScreen from '../screens/RestoreScreen';

export const DaoScreens = [
    {
      name: 'DaoList',
      title: 'Dao List',
      component: DaoListScreen
    },
    {
      name: 'CreateDao',
      title: 'Create your Project',
      component: CreateDaoScreen
    },
    {
      name: 'cofounderDetails',
      title: 'Create your Project',
      component: CofounderDetailsScreen
    },
    {
      name: 'Review',
      title: 'Review',
      component: ReviewScreen
    },
    {
      name: 'DaoHomeScreen',
      title: 'Home',
      component: DaoHomeScreen
    },
    {
      name: 'CreateProposal',
      title: 'Create Proposal',
      component: CreateProposal
    },
    {
      name: 'ProposalDetails',
      title: 'Proposal Details',
      component: ProposalDetailsScreen
    }
  ];

  export const WalletScreens = [
    {
        name: 'WalletHomeScreen',
        title: 'Wallet',
        component: WalletHomeScreen
      },
      {
        name: 'sendScreen',
        title: 'Wallet',
        component: SendScreen
      },
  ];

//   export const RestoreScreens = [
//     {
//         name: 'RestoreScreen',
//         title: 'Restore Wallet',
//         component: RestoreScreen
//       },
//   ];