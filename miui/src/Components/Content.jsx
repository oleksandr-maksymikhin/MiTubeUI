import '../Styles/Content.scss';

import { ActiveContentContext } from '../Context/ActiveContentContext';
import { useContext } from 'react';

import FilterModal from './Modals/FilterModal';

import Toolbar from './Wrappers/Toolbar';
import Sidebar from './Wrappers/Sidebar';

export default
function Content() {

  const { activeContent, activeModal, setActiveModal } = useContext(ActiveContentContext);

    return  (
      <>
        <div className="container">
          <Toolbar openFilter={() => setActiveModal(<FilterModal closeFilter={() => setActiveModal()}/>)}/>
          <div className="row"> 
              <div className="column sidebar">
                  <Sidebar/>
              </div>
              <div className="column content" id="myContent">
                  { activeContent }
              </div>
          </div>
        </div>
        { activeModal }
      </>
    );
  
}
