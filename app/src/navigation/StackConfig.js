//Navigation Screens Import
import DaoListScreen from '../screens/DaoListScreen';
import CreateDaoScreen from '../screens/CreateDaoScreen';
import CofounderDetailsScreen from '../screens/CofounderDetailsScreen';
import ReviewScreen from '../screens/ReviewScreen';
import DaoHomeScreen from '../screens/DaoScreens/DaoHomeScreen';
import WalletHomeScreen from '../screens/WalletHomeScreen';
import SendScreen from '../screens/SendScreen';
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