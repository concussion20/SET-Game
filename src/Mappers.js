import {connect} from 'react-redux';

let mapDispatchToProps = function(dispatch, ownProps) {
  return {
    dispatch: dispatch
  };
}
  
let mapStateToProps = function(state, ownProps) {
  return {
    store: state
  };
}
  
export default connect( 
  mapStateToProps,
  mapDispatchToProps
);

