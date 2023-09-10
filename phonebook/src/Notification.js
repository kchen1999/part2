const Notification = ({ notificationMessage, errorState }) => {
    if (notificationMessage === null) {
      return null
    }

    const successStyle = {
        color: 'green',
        fontSize: 16,
        height: 30,
        borderColor: 'green', 
        borderWidth: 3,
        borderStyle: 'solid',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#CDCDCD',
        marginBottom: 10,
        textAlign: 'centre',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center'
    }

    const errorStyle = {
      ...successStyle,
      color: 'red',
      borderColor: 'red', 
  }
  
  if(errorState) {
    return (
      <div style={errorStyle}>
        {notificationMessage}
      </div>
    )
  }
  else {
    return (
      <div style={successStyle}>
        {notificationMessage}
      </div>
    )
  }
    
    
  }

  export default Notification; 