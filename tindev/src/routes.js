import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';

export default createAppContainer(
    // Desabilita varias funções relacionadas a navegação de tela com o celular
    createSwitchNavigator({
        Login,
        Main,
    })
);