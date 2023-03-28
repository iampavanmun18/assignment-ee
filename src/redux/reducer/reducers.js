function reducer(state = { data: "" }, action) {
    console.log('data', action.data)
    switch (action.type) {
      case "FETCH_DATA":
        return {
          ...state,
          data: action.data
        };

        case "RMV_CART":
            const filterredData = state.data.filter((ele)=>{
                return ele.id !== action.payload
            })
            return{
                ...state,
                data : filterredData

            }

            case "EDT_CART":
              const selectedUser = state.data.find((user) => user.id === action.payload);
              console.log('selectedUser', selectedUser)

              // ({
              //   name: selectedUser.name,
              //   email: selectedUser.email,
              //   phone: selectedUser.phone,
              //   website: selectedUser.website,
              // });


              return{
                  ...state,
                  data : selectedUser

              }



      default:
        return state;
    }
  }

  export default reducer;
