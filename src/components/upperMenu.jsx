//import './App.css';
import UpperMenuList from './upperMenuList';

function UpperMenu(props) {
  return (
    <div className="upperMenu">
        <UpperMenuList {...props} />
        
    </div>
  );
}

export default UpperMenu;
