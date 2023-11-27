import Accueil from '../pages/Home'
import SignUp from '../pages/account/SignUp'
import SignIn from '../pages/account/LogIn'
import MyAccount from '../pages/account/myAccount/MyAccount'
import ManageGroupe from '../pages/account/management/ManageGroupe'
import Registration from '../pages/account/registration/Registration'
import SignPage from '../pages/account/registration/SignPage'
import Session from '../pages/account/session/Session'

export const nav = [
    {path: '/', name: "Accueil", element: <Accueil />, isAuth: false},
    {path: '/signUp', name: "Inscription",  element: <SignUp />, isAuth: false},
    {path: '/signIn', name: "Connexion", element: <SignIn />, isAuth: false},
    {path: '/account', name: "Mon compte", element: <MyAccount />, isAuth: true},
    {path: '/manageGroupe', name: "Gestion de groupe", element: <ManageGroupe />, isAuth: true, requiredRole: 'Formateur'},
    {path: '/session', name: "Session d'émargement", element: <Session />, isAuth: true, requiredRole: 'Formateur'},
    {path: '/emargement', name: "Emargement", element: <Registration />, isAuth: true},
    {path: '/emargement/sign', name: "Signature de l'émargement", element: <SignPage />, isAuth: true}
]