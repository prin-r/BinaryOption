export const getAssets = async () => {
  return await Promise.all(
    [
      'Ether',
      'Dai',
      'USDCoin',
      'Augur',
      '0x',
      'WrappedBTC',
      'BasicAttentionToken',
    ].map(assetName => getAnAsset(assetName)),
  )
}

export const getUserAssets = async userAddress => {
  return await Promise.all(
    [
      'Ether',
      'Dai',
      'USDCoin',
      'Augur',
      '0x',
      'WrappedBTC',
      'BasicAttentionToken',
    ].map(assetName => getAnUserAsset(userAddress, assetName)),
  )
}

export const borrow = async (userAddress, assetName) => {
  const assets = await getBorrowedAssets(userAddress)
  localStorage.setItem(
    userAddress + '_BorrowedAssets',
    JSON.stringify(Array.from(new Set([...assets, assetName]))),
  )

  const userAsset = await getAnUserAsset(userAddress, assetName)
  userAsset.borrowBalance = (
    Number(userAsset.borrowBalance) +
    Math.random() * 100
  ).toFixed(0)
  userAsset.borrowingPower = (
    Number(userAsset.depositBalance) - Number(userAsset.borrowBalance)
  ).toFixed(0)
  localStorage.setItem(userAddress + '_' + assetName, JSON.stringify(userAsset))
}

export const deposit = async (userAddress, assetName) => {
  const assets = await getDepositAssets(userAddress)
  localStorage.setItem(
    userAddress + '_DepositAssets',
    JSON.stringify(Array.from(new Set([...assets, assetName]))),
  )

  const userAsset = await getAnUserAsset(userAddress, assetName)
  userAsset.depositBalance = (
    Number(userAsset.depositBalance) +
    Math.random() * 100
  ).toFixed(0)
  userAsset.borrowingPower = (
    Number(userAsset.depositBalance) - Number(userAsset.borrowBalance)
  ).toFixed(0)
  localStorage.setItem(userAddress + '_' + assetName, JSON.stringify(userAsset))
}

export const withdraw = async (userAddress, assetName) => {
  const assets = await getDepositAssets(userAddress)
  localStorage.setItem(
    userAddress + '_DepositAssets',
    JSON.stringify(assets.filter(name => name !== assetName)),
  )

  const userAsset = await getAnUserAsset(userAddress, assetName)
  userAsset.depositBalance = 0
  userAsset.borrowingPower = 0
  localStorage.setItem(userAddress + '_' + assetName, JSON.stringify(userAsset))
}

export const repay = async (userAddress, assetName) => {
  const assets = await getBorrowedAssets(userAddress)
  localStorage.setItem(
    userAddress + '_BorrowedAssets',
    JSON.stringify(assets.filter(name => name !== assetName)),
  )

  const userAsset = await getAnUserAsset(userAddress, assetName)
  userAsset.borrowBalance = 0
  userAsset.borrowingPower = userAsset.depositBalance
  localStorage.setItem(userAddress + '_' + assetName, JSON.stringify(userAsset))
}

export const getBorrowedAssets = async userAddress => {
  const assets = JSON.parse(
    localStorage.getItem(userAddress + '_BorrowedAssets'),
  )
  return assets || []
}

export const getDepositAssets = async userAddress => {
  const assets = JSON.parse(
    localStorage.getItem(userAddress + '_DepositAssets'),
  )
  return assets || []
}

export const enableAsset = async (userAddress, assetName) => {
  const asset = await getAnUserAsset(userAddress, assetName)
  asset.isEnable = true
  localStorage.setItem(userAddress + '_' + assetName, JSON.stringify(asset))
}

export const enableBorrowAsset = async (userAddress, assetName) => {
  const asset = await getAnUserAsset(userAddress, assetName)
  asset.isEnableBorrow = true
  localStorage.setItem(userAddress + '_' + assetName, JSON.stringify(asset))
}

export const getAnAsset = async assetName => {
  return {
    name: assetName,
    price: `$${(Math.random() * 1000).toFixed(2)}`,
    grossSupply: `$${(Math.random() * 100).toFixed(2)}M`,
    supplyAPR: `${(Math.random() * 0.2).toFixed(3)}%`,
    grossBorrow: `$${(Math.random() * 1000).toFixed(2)}K`,
    borrowAPR: `${(Math.random() * 10).toFixed(2)}%`,
    collateralFactor: `${(Math.random() * 100).toFixed(2)}%`,
    utilization: `${Math.random().toFixed(2)}%`,
    marketLiquidity: `$${(Math.random() * 1000000).toFixed(0)}K`,
  }
}

export const getAnUserAsset = async (userAddress, assetName) => {
  const asset = JSON.parse(localStorage.getItem(userAddress + '_' + assetName))
  if (asset) return asset
  return {
    name: assetName,
    depositBalance: '0',
    borrowBalance: '0',
    grossBorrow: '0',
    borrowingPower: '0',
    borrowAPR: (Math.random() * 10).toFixed(2) + '%',
    isEnable: false,
    isEnableBorrow: false,
  }
}
