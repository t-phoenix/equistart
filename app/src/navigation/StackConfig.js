//Navigation Screens Import
import DaoListScreen from '../screens/DaoScreens/DaoListScreen';
import CreateDaoScreen from '../screens/DaoScreens/CreateDaoScreen';
import CofounderDetailsScreen from '../screens/DaoScreens/CofounderDetailsScreen';
import ReviewScreen from '../screens/DaoScreens/ReviewScreen';
import DaoHomeScreen from '../screens/DaoScreens/DaoHomeScreen';
import WalletHomeScreen from '../screens/WalletScreens/WalletHomeScreen';
import SendScreen from '../screens/WalletScreens/SendScreen';
import CreateProposal from '../screens/DaoScreens/CreateProposal';
import ProposalDetailsScreen from '../screens/DaoScreens/ProposalDetailsScreen';
// import RestoreScreen from '../screens/RestoreScreen';
import InstructionHomeScreen from '../screens/InstructionScreens/InstructionHomeScreen';

export const DaoScreens = [
    {
      name: 'DaoList',
      title: 'Project List',
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
        name: 'SendScreen',
        title: 'Wallet',
        component: SendScreen
      },
  ];

  export const InstructionScreens = [
    {
      name: 'InstructionHomeScreen',
      title: 'Instructions',
      component: InstructionHomeScreen
    }
  ]

//   export const RestoreScreens = [
//     {
//         name: 'RestoreScreen',
//         title: 'Restore Wallet',
//         component: RestoreScreen
//       },
//   ];