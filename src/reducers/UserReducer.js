export const UserStateTemplate = {
  address: '',
  assets: {
    // ExampleToken: {
    //   name: 'ExampleToken',
    //   depositBalance: '-',
    //   borrowBalance: '-',
    //   grossBorrow: '-',
    //   borrowAPR: '-',
    //   isEnable: false,
    //   isEnableBorrow: false,
    // },
  },
  borrowedAssets: [],
  depositAssets: [],
}

export const UserReducer = (state, action) => {
  // some middleware
  switch (action.type) {
    case 'setAddress':
      return {
        ...state,
        address: action.address,
      }
    case 'setDepositAsset':
      return {
        ...state,
        depositAssets: [...action.assets],
      }
    case 'setBorrowedAsset':
      return {
        ...state,
        borrowedAssets: [...action.assets],
      }
    case 'setAsset':
      return {
        ...state,
        assets: {
          ...state.assets,
          [action.asset.name]: action.asset,
        },
      }
    case 'setAssets':
      return {
        ...state,
        assets: { ...action.assets },
      }
    default:
      return state
  }
}
