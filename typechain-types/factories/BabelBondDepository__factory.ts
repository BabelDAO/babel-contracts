/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  BabelBondDepository,
  BabelBondDepositoryInterface,
} from "../BabelBondDepository";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_BABEL",
        type: "address",
      },
      {
        internalType: "address",
        name: "_principle",
        type: "address",
      },
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "_bondCalculator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "expires",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "priceInUSD",
        type: "uint256",
      },
    ],
    name: "BondCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "priceInUSD",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "internalPrice",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "debtRatio",
        type: "uint256",
      },
    ],
    name: "BondPriceChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "remaining",
        type: "uint256",
      },
    ],
    name: "BondRedeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "initialBCV",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBCV",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "adjustment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "addition",
        type: "bool",
      },
    ],
    name: "ControlVariableAdjustment",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipPulled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipPushed",
    type: "event",
  },
  {
    inputs: [],
    name: "BABEL",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "adjustment",
    outputs: [
      {
        internalType: "bool",
        name: "add",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "target",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "buffer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastBlock",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "assetPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bondCalculator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "bondInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vesting",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pricePaid",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bondPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "price_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bondPriceInUSD",
    outputs: [
      {
        internalType: "uint256",
        name: "price_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentDebt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "debtDecay",
    outputs: [
      {
        internalType: "uint256",
        name: "decay_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "debtRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "debtRatio_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_depositor",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_controlVariable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_vestingTerm",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minimumPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxPayout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_initialDebt",
        type: "uint256",
      },
    ],
    name: "initializeBondTerms",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastDecay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxPayout",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "payoutFor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_depositor",
        type: "address",
      },
    ],
    name: "pendingPayoutFor",
    outputs: [
      {
        internalType: "uint256",
        name: "pendingPayout_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_depositor",
        type: "address",
      },
    ],
    name: "percentVestedFor",
    outputs: [
      {
        internalType: "uint256",
        name: "percentVested_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "policy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "principle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pullManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner_",
        type: "address",
      },
    ],
    name: "pushManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_stake",
        type: "bool",
      },
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_addition",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_increment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_target",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_buffer",
        type: "uint256",
      },
    ],
    name: "setAdjustment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum BabelBondDepository.PARAMETER",
        name: "_parameter",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_input",
        type: "uint256",
      },
    ],
    name: "setBondTerms",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_staking",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_helper",
        type: "bool",
      },
    ],
    name: "setStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "staking",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingHelper",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "standardizedDebtRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "terms",
    outputs: [
      {
        internalType: "uint256",
        name: "controlVariable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vestingTerm",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minimumPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxPayout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxDebt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDebt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "useHelper",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x61010060405234801561001157600080fd5b506040516200271c3803806200271c833981810160405260a081101561003657600080fd5b50805160208201516040808401516060850151608090950151600080546001600160a01b031916331780825593519596949592949391926001600160a01b0392909216917fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908290a36001600160a01b0385166100b257600080fd5b6001600160601b0319606086901b166080526001600160a01b0384166100d757600080fd5b6001600160601b0319606085901b1660a0526001600160a01b0383166100fc57600080fd5b606083811b6001600160601b031990811660c05283821b1660e052600280546001600160a01b0319166001600160a01b0393841617905560805160a05190821c9650901c93509182169116612565620001b760003980610e6f52806113b35280611474525080610cf9528061103652806111ca52806112165250806105495280610e9e528061106552806111a752806113e25250806114e352806116c8528061172f52806118b4528061199b5280611aad52506125656000f3fe608060405234801561001057600080fd5b50600436106101fb5760003560e01c80637927ebf81161011a578063d24378eb116100ad578063d7ccfb0b1161007c578063d7ccfb0b1461051f578063e0176de814610527578063e392a2621461052f578063f5c2ab5b14610537578063fc7b9c181461053f576101fb565b8063d24378eb146104ae578063d4d863ce146104b6578063d5025625146104e4578063d59682c714610517576101fb565b8063904b3ece116100e9578063904b3ece1461044a578063c5332b7c14610452578063cd1234b31461045a578063cea55f57146104a6576101fb565b80637927ebf8146103b85780637b261727146103d5578063844b5c7c146104105780638dbdbe6d14610418576101fb565b8063451ee4a1116101925780635a96ac0a116101615780635a96ac0a1461039857806361d027b3146103a0578063759076e5146103a857806377b81895146103b0576101fb565b8063451ee4a11461030f57806346f68ee9146103445780634cf088d91461036a578063507930ec14610372576101fb565b80631a3d0068116101ce5780631a3d00681461026e5780631e321a0f1461029f5780631feed31f146102c55780632f3f470a146102f3576101fb565b8063016a42841461020057806301b88ee8146102245780630505c8c91461025c578063089208d814610264575b600080fd5b610208610547565b604080516001600160a01b039092168252519081900360200190f35b61024a6004803603602081101561023a57600080fd5b50356001600160a01b031661056b565b60408051918252519081900360200190f35b6102086105c4565b61026c6105d4565b005b61026c6004803603608081101561028457600080fd5b5080351515906020810135906040810135906060013561066b565b61026c600480360360408110156102b557600080fd5b5060ff8135169060200135610763565b61024a600480360360408110156102db57600080fd5b506001600160a01b03813516906020013515156108a2565b6102fb610a97565b604080519115158252519081900360200190f35b610317610aa7565b60408051951515865260208601949094528484019290925260608401526080830152519081900360a00190f35b61026c6004803603602081101561035a57600080fd5b50356001600160a01b0316610abf565b610208610bac565b61024a6004803603602081101561038857600080fd5b50356001600160a01b0316610bbb565b61026c610c4d565b610208610cf7565b61024a610d1b565b610208610d36565b61024a600480360360208110156103ce57600080fd5b5035610d45565b61026c600480360360c08110156103eb57600080fd5b5080359060208101359060408101359060608101359060808101359060a00135610d6a565b61024a610e54565b61024a6004803603606081101561042e57600080fd5b50803590602081013590604001356001600160a01b0316610f34565b61024a6113a4565b610208611472565b6104806004803603602081101561047057600080fd5b50356001600160a01b0316611496565b604080519485526020850193909352838301919091526060830152519081900360800190f35b61024a6114bd565b61024a61156b565b61026c600480360360408110156104cc57600080fd5b506001600160a01b03813516906020013515156115f1565b6104ec6116b4565b6040805195865260208601949094528484019290925260608401526080830152519081900360a00190f35b6102086116c6565b61024a6116ea565b61024a61171b565b61024a6117b8565b61024a6117fd565b61024a611803565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008061057783610bbb565b6001600160a01b0384166000908152600f602052604090205490915061271082106105a4578092506105bd565b6105ba6127106105b48385611809565b90611869565b92505b5050919050565b6000546001600160a01b03165b90565b6000546001600160a01b03163314610621576040805162461bcd60e51b8152602060048201819052602482015260008051602061249f833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908390a3600080546001600160a01b0319169055565b6000546001600160a01b031633146106b8576040805162461bcd60e51b8152602060048201819052602482015260008051602061249f833981519152604482015290519081900360640190fd5b6005546106ce906103e8906105b4906019611809565b831115610718576040805162461bcd60e51b8152602060048201526013602482015272496e6372656d656e7420746f6f206c6172676560681b604482015290519081900360640190fd5b6040805160a0810182529415158086526020860185905290850183905260608501829052436080909501859052600a805460ff19169091179055600b92909255600c55600d55600e55565b6000546001600160a01b031633146107b0576040805162461bcd60e51b8152602060048201819052602482015260008051602061249f833981519152604482015290519081900360640190fd5b60008260028111156107be57fe5b141561080f576127108110156108055760405162461bcd60e51b81526004018080602001828103825260248152602001806124e26024913960400191505060405180910390fd5b600681905561089e565b600182600281111561081d57fe5b1415610884576103e881111561087a576040805162461bcd60e51b815260206004820181905260248201527f5061796f75742063616e6e6f742062652061626f766520312070657263656e74604482015290519081900360640190fd5b600881905561089e565b600282600281111561089257fe5b141561089e5760098190555b5050565b60006108ac6123d5565b506001600160a01b0383166000908152600f60209081526040808320815160808101835281548152600182015493810193909352600281015491830191909152600301546060820152906108ff85610bbb565b9050612710811061098f576001600160a01b0385166000818152600f602090815260408083208381556001810184905560028101849055600301839055855181519081529182019290925281517f51c99f515c87b0d95ba97f616edd182e8f161c4932eac17c6fefe9dab58b77b1929181900390910190a2610986858584600001516118ab565b92505050610a91565b81516000906109a690612710906105b49085611809565b905060405180608001604052806109ca838660000151611bae90919063ffffffff16565b81526020016109f46109e9866040015143611bae90919063ffffffff16565b602087015190611bae565b8152436020808301919091526060808701516040938401526001600160a01b038a166000818152600f84528490208551808255868501516001830155868601516002830155959092015160039092019190915582518581529182019390935281517f51c99f515c87b0d95ba97f616edd182e8f161c4932eac17c6fefe9dab58b77b1929181900390910190a2610a8b8686836118ab565b93505050505b92915050565b600454600160a01b900460ff1681565b600a54600b54600c54600d54600e5460ff9094169385565b6000546001600160a01b03163314610b0c576040805162461bcd60e51b8152602060048201819052602482015260008051602061249f833981519152604482015290519081900360640190fd5b6001600160a01b038116610b515760405162461bcd60e51b81526004018080602001828103825260268152602001806124106026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba91a3600180546001600160a01b0319166001600160a01b0392909216919091179055565b6003546001600160a01b031681565b6000610bc56123d5565b506001600160a01b0382166000908152600f602090815260408083208151608081018352815481526001820154938101939093526002810154918301829052600301546060830152909190610c1b904390611bae565b60208301519091508015610c4057610c39816105b484612710611809565b9350610c45565b600093505b505050919050565b6001546001600160a01b03163314610c965760405162461bcd60e51b81526004018080602001828103825260228152602001806124366022913960400191505060405180910390fd5b600154600080546040516001600160a01b0393841693909116917faa151555690c956fc3ea32f106bb9f119b5237a061eaa8557cff3e51e3792c8d91a3600154600080546001600160a01b0319166001600160a01b03909216919091179055565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000610d31610d286117b8565b60105490611bae565b905090565b6004546001600160a01b031681565b6000610a91655af3107a40006105b4610d6585610d606116ea565b611bf0565b611d67565b6000546001600160a01b03163314610db7576040805162461bcd60e51b8152602060048201819052602482015260008051602061249f833981519152604482015290519081900360640190fd5b60055415610e0c576040805162461bcd60e51b815260206004820181905260248201527f426f6e6473206d75737420626520696e697469616c697a65642066726f6d2030604482015290519081900360640190fd5b6040805160a081018252878152602081018790529081018590526060810184905260800182905260059590955560069390935560079190915560085560095560105543601155565b6000610d3164e8d4a510006105b4610e6a61156b565b610f2e7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166332da80a37f00000000000000000000000000000000000000000000000000000000000000006040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015610efa57600080fd5b505afa158015610f0e573d6000803e3d6000fd5b505050506040513d6020811015610f2457600080fd5b5051610f2e6116ea565b90611809565b60006001600160a01b038216610f83576040805162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b604482015290519081900360640190fd5b610f8b611d7f565b6009546010541115610fdb576040805162461bcd60e51b815260206004820152601460248201527313585e0818d85c1858da5d1e481c995858da195960621b604482015290519081900360640190fd5b6000610fe5610e54565b90506000610ff1611d93565b9050808510156110325760405162461bcd60e51b81526004018080602001828103825260238152602001806124bf6023913960400191505060405180910390fd5b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316631eec5a9a7f0000000000000000000000000000000000000000000000000000000000000000896040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060206040518083038186803b1580156110c957600080fd5b505afa1580156110dd573d6000803e3d6000fd5b505050506040513d60208110156110f357600080fd5b50519050600061110282610d45565b90506298968081101561114d576040805162461bcd60e51b815260206004820152600e60248201526d109bdb99081d1bdbc81cdb585b1b60921b604482015290519081900360640190fd5b61115561171b565b81111561119a576040805162461bcd60e51b815260206004820152600e60248201526d426f6e6420746f6f206c6172676560901b604482015290519081900360640190fd5b6111ef6001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016337f00000000000000000000000000000000000000000000000000000000000000008b611dcd565b604080516335106f4960e11b81523060048201526024810183905290516001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001691636a20de9291604480830192600092919082900301818387803b15801561125d57600080fd5b505af1158015611271573d6000803e3d6000fd5b50506010546112839250905083611e2d565b601055604080516080810182526001600160a01b0388166000908152600f602052919091205481906112b59084611e2d565b81526006805460208084019190915243604080850182905260609485018a90526001600160a01b038c166000908152600f8452819020865181559286015160018401558501516002830155939092015160039092019190915554859161131a91611e2d565b604080518b8152905184917f1fec6dc81f140574bf43f6b1e420ae1dd47928b9d57db8cbd7b8611063b85ae5919081900360200190a46113586114bd565b611360611d93565b611368610e54565b6040517f375b221f40939bfd8f49723a17cf7bc6d576ebf72efe2cc3e991826f5b3f390a90600090a4611399611e87565b979650505050505050565b6000610d31633b9aca006105b47f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166332da80a37f00000000000000000000000000000000000000000000000000000000000000006040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561143e57600080fd5b505afa158015611452573d6000803e3d6000fd5b505050506040513d602081101561146857600080fd5b5051610f2e6114bd565b7f000000000000000000000000000000000000000000000000000000000000000081565b600f6020526000908152604090208054600182015460028301546003909301549192909184565b6000610d31670de0b6b3a76400006105b4610d656114e1633b9aca00610f2e610d1b565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561153a57600080fd5b505afa15801561154e573d6000803e3d6000fd5b505050506040513d602081101561156457600080fd5b5051611bf0565b600080600260009054906101000a90046001600160a01b03166001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b1580156115bc57600080fd5b505afa1580156115d0573d6000803e3d6000fd5b505050506040513d60a08110156115e657600080fd5b506020015191505090565b6000546001600160a01b0316331461163e576040805162461bcd60e51b8152602060048201819052602482015260008051602061249f833981519152604482015290519081900360640190fd5b6001600160a01b03821661165157600080fd5b80156116865760048054600160a01b60ff60a01b19909116176001600160a01b0319166001600160a01b03841617905561089e565b6004805460ff60a01b19169055600380546001600160a01b0384166001600160a01b03199091161790555050565b60055460065460075460085460095485565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000611707620186a06105b46116fe6114bd565b60055490611809565b6007549091508110156105d1575060075490565b6000610d31620186a06105b46005600301547f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561178657600080fd5b505afa15801561179a573d6000803e3d6000fd5b505050506040513d60208110156117b057600080fd5b505190611809565b6000806117d060115443611bae90919063ffffffff16565b6006546010549192506117e7916105b49084611809565b91506010548211156117f95760105491505b5090565b60115481565b60105481565b60008261181857506000610a91565b8282028284828161182557fe5b04146118625760405162461bcd60e51b815260040180806020018281038252602181526020018061247e6021913960400191505060405180910390fd5b9392505050565b600061186283836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250611f67565b60008261195b577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a9059cbb85846040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561192957600080fd5b505af115801561193d573d6000803e3d6000fd5b505050506040513d602081101561195357600080fd5b50611ba79050565b600454600160a01b900460ff1615611a8157600480546040805163095ea7b360e01b81526001600160a01b039283169381019390935260248301859052517f00000000000000000000000000000000000000000000000000000000000000009091169163095ea7b39160448083019260209291908290030181600087803b1580156119e557600080fd5b505af11580156119f9573d6000803e3d6000fd5b505050506040513d6020811015611a0f57600080fd5b50506004805460408051637acb775760e01b81529283018590526001600160a01b0387811660248501529051911691637acb775791604480830192600092919082900301818387803b158015611a6457600080fd5b505af1158015611a78573d6000803e3d6000fd5b50505050611ba7565b6003546040805163095ea7b360e01b81526001600160a01b0392831660048201526024810185905290517f00000000000000000000000000000000000000000000000000000000000000009092169163095ea7b3916044808201926020929091908290030181600087803b158015611af857600080fd5b505af1158015611b0c573d6000803e3d6000fd5b505050506040513d6020811015611b2257600080fd5b505060035460408051637acb775760e01b8152600481018590526001600160a01b03878116602483015291519190921691637acb77579160448083019260209291908290030181600087803b158015611b7a57600080fd5b505af1158015611b8e573d6000803e3d6000fd5b505050506040513d6020811015611ba457600080fd5b50505b5092915050565b600061186283836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250612009565b611bf86123fd565b60008211611c375760405162461bcd60e51b81526004018080602001828103825260268152602001806124586026913960400191505060405180910390fd5b82611c515750604080516020810190915260008152610a91565b71ffffffffffffffffffffffffffffffffffff8311611cf857600082607085901b81611c7957fe5b0490506001600160e01b03811115611cd8576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b6040518060200160405280826001600160e01b0316815250915050610a91565b6000611d0984600160701b85612063565b90506001600160e01b03811115611cd8576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b516612725dd1d243ab6001600160e01b039091160490565b611d8a610d286117b8565b60105543601155565b6000611da7620186a06105b46116fe6114bd565b600754909150811015611dbd57506007546105d1565b600754156105d157600060075590565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b179052611e279085906120f8565b50505050565b600082820183811015611862576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600d54600e54600091611e9a9190611e2d565b600b5490915015801590611eae5750804310155b15611f6457600554600a5460ff1615611ee857600b54600554611ed091611e2d565b6005819055600c5411611ee3576000600b555b611f0a565b600b54600554611ef791611bae565b6005819055600c5410611f0a576000600b555b43600e55600554600b54600a546040805185815260208101949094528381019290925260ff1615156060830152517fb923e581a0f83128e9e1d8297aa52b18d6744310476e0b54509c054cd7a93b2a9181900360800190a1505b50565b60008183611ff35760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611fb8578181015183820152602001611fa0565b50505050905090810190601f168015611fe55780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000838581611fff57fe5b0495945050505050565b6000818484111561205b5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315611fb8578181015183820152602001611fa0565b505050900390565b600080600061207286866121ae565b915091506000848061208057fe5b868809905082811115612094576001820391505b80830392508482106120ed576040805162461bcd60e51b815260206004820152601a60248201527f46756c6c4d6174683a3a6d756c4469763a206f766572666c6f77000000000000604482015290519081900360640190fd5b6113998383876121db565b606061214d826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661224b9092919063ffffffff16565b8051909150156121a95780806020019051602081101561216c57600080fd5b50516121a95760405162461bcd60e51b815260040180806020018281038252602a815260200180612506602a913960400191505060405180910390fd5b505050565b60008080600019848609905083850292508281039150828110156121d3576001820391505b509250929050565b600081810382168083816121eb57fe5b0492508085816121f757fe5b04945080816000038161220657fe5b60028581038087028203028087028203028087028203028087028203028087028203028087028203029586029003909402930460010193909302939093010292915050565b606061225a8484600085612262565b949350505050565b606061226d856123cf565b6122be576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b60006060866001600160a01b031685876040518082805190602001908083835b602083106122fd5780518252601f1990920191602091820191016122de565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d806000811461235f576040519150601f19603f3d011682016040523d82523d6000602084013e612364565b606091505b5091509150811561237857915061225a9050565b8051156123885780518082602001fd5b60405162461bcd60e51b8152602060048201818152865160248401528651879391928392604401919085019080838360008315611fb8578181015183820152602001611fa0565b3b151590565b6040518060800160405280600081526020016000815260200160008152602001600081525090565b6040805160208101909152600081529056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a206d757374206265206e6577206f776e657220746f2070756c6c4669786564506f696e743a3a6672616374696f6e3a206469766973696f6e206279207a65726f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572536c697070616765206c696d69743a206d6f7265207468616e206d617820707269636556657374696e67206d757374206265206c6f6e676572207468616e20333620686f7572735361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a2646970667358221220975ce42d69c9fd6eadcc77c7fd88228fcfc0278cee2e69d7df5a6ad78cd78d7464736f6c63430007050033";

type BabelBondDepositoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BabelBondDepositoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BabelBondDepository__factory extends ContractFactory {
  constructor(...args: BabelBondDepositoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _BABEL: string,
    _principle: string,
    _treasury: string,
    _bondCalculator: string,
    _feed: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BabelBondDepository> {
    return super.deploy(
      _BABEL,
      _principle,
      _treasury,
      _bondCalculator,
      _feed,
      overrides || {}
    ) as Promise<BabelBondDepository>;
  }
  getDeployTransaction(
    _BABEL: string,
    _principle: string,
    _treasury: string,
    _bondCalculator: string,
    _feed: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _BABEL,
      _principle,
      _treasury,
      _bondCalculator,
      _feed,
      overrides || {}
    );
  }
  attach(address: string): BabelBondDepository {
    return super.attach(address) as BabelBondDepository;
  }
  connect(signer: Signer): BabelBondDepository__factory {
    return super.connect(signer) as BabelBondDepository__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BabelBondDepositoryInterface {
    return new utils.Interface(_abi) as BabelBondDepositoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BabelBondDepository {
    return new Contract(address, _abi, signerOrProvider) as BabelBondDepository;
  }
}
