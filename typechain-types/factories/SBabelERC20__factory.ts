/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SBabelERC20, SBabelERC20Interface } from "../SBabelERC20";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rebase",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "LogRebase",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "stakingContract",
        type: "address",
      },
    ],
    name: "LogStakingContractUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
    ],
    name: "LogSupply",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "INDEX",
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
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gons",
        type: "uint256",
      },
    ],
    name: "balanceForGons",
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
        name: "who",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "circulatingSupply",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "gonsForBalance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "index",
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
        name: "stakingContract_",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initializer",
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
    name: "manager",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "profit_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "epoch_",
        type: "uint256",
      },
    ],
    name: "rebase",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "rebases",
    outputs: [
      {
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rebase",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalStakedBefore",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalStakedAfter",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountRebased",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "blockNumberOccured",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "_INDEX",
        type: "uint256",
      },
    ],
    name: "setIndex",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingContract",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604080518082018252600c81526b14dd185ad95908109858995b60a21b6020808301918252835180850190945260068452651cd09050915360d21b90840152815191929160099162000068916003919062000365565b5081516200007e90600490602085019062000365565b506005805460ff191660ff92909216919091179055504690507f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f620000c2620001d3565b805160209182012060408051808201825260018152603160f81b90840152805180840194909452838101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606084015260808301939093523060a0808401919091528351808403909101815260c0909201928390528151910120600755600880546001600160a01b0319163317908190556001600160a01b0316906000907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908290a3600b80546001600160a01b031916331790556611c37937e080006002819055620001ca908060001906600019036200026d60201b620013661790919060201c565b600e5562000411565b60038054604080516020601f6002600019610100600188161502019095169490940493840181900481028201810190925282815260609390929091830182828015620002635780601f10620002375761010080835404028352916020019162000263565b820191906000526020600020905b8154815290600101906020018083116200024557829003601f168201915b5050505050905090565b6000620002b783836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250620002be60201b60201c565b9392505050565b600081836200034e5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101562000312578181015183820152602001620002f8565b50505050905090810190601f168015620003405780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385816200035b57fe5b0495945050505050565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200039d5760008555620003e8565b82601f10620003b857805160ff1916838001178555620003e8565b82800160010185558215620003e8579182015b82811115620003e8578251825591602001919060010190620003cb565b50620003f6929150620003fa565b5090565b5b80821115620003f65760008155600101620003fb565b61182480620004216000396000f3fe608060405234801561001057600080fd5b50600436106101da5760003560e01c8063481c6a751161010457806395d89b41116100a2578063c4d66de811610071578063c4d66de81461053d578063d505accf14610563578063dd62ed3e146105b4578063ee99205c146105e2576101da565b806395d89b41146104d55780639ce110d7146104dd578063a457c2d7146104e5578063a9059cbb14610511576101da565b806373c69eb7116100de57806373c69eb7146104355780637965d56d1461048a5780637ecebe00146104a75780639358928b146104cd576101da565b8063481c6a75146103e35780635a96ac0a1461040757806370a082311461040f576101da565b80632986c0e51161017c5780633644e5151161014b5780633644e5151461036c578063395093511461037457806340a5737f146103a057806346f68ee9146103bd576101da565b80632986c0e5146103365780632df75cb11461033e57806330adf81f14610346578063313ce5671461034e576101da565b8063095ea7b3116101b8578063095ea7b31461029b57806318160ddd146102db5780631bd39674146102e357806323b872dd14610300576101da565b8063058ecdb4146101df57806306fdde0314610214578063089208d814610291575b600080fd5b610202600480360360408110156101f557600080fd5b50803590602001356105ea565b60408051918252519081900360200190f35b61021c610734565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561025657818101518382015260200161023e565b50505050905090810190601f1680156102835780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102996107ca565b005b6102c7600480360360408110156102b157600080fd5b506001600160a01b038135169060200135610873565b604080519115158252519081900360200190f35b6102026108c7565b610202600480360360208110156102f957600080fd5b50356108cd565b6102c76004803603606081101561031657600080fd5b506001600160a01b038135811691602081013590911690604001356108e4565b610202610a1e565b610202610a30565b610202610a36565b610356610a5a565b6040805160ff9092168252519081900360200190f35b610202610a63565b6102c76004803603604081101561038a57600080fd5b506001600160a01b038135169060200135610a69565b6102c7600480360360208110156103b657600080fd5b5035610aea565b610299600480360360208110156103d357600080fd5b50356001600160a01b0316610b6d565b6103eb610c6d565b604080516001600160a01b039092168252519081900360200190f35b610299610c7c565b6102026004803603602081101561042557600080fd5b50356001600160a01b0316610d28565b6104526004803603602081101561044b57600080fd5b5035610d50565b604080519788526020880196909652868601949094526060860192909252608085015260a084015260c0830152519081900360e00190f35b610202600480360360208110156104a057600080fd5b5035610da2565b610202600480360360208110156104bd57600080fd5b50356001600160a01b0316610db9565b610202610dda565b61021c610dff565b6103eb610e60565b6102c7600480360360408110156104fb57600080fd5b506001600160a01b038135169060200135610e6f565b6102c76004803603604081101561052757600080fd5b506001600160a01b038135169060200135610f46565b6102c76004803603602081101561055357600080fd5b50356001600160a01b0316611006565b610299600480360360e081101561057957600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c001356110ff565b610202600480360360408110156105ca57600080fd5b506001600160a01b038135811691602001351661132c565b6103eb611357565b600a546000906001600160a01b0316331461060457600080fd5b60008061060f610dda565b9050846106a557600254604080514281526020810192909252805186927f917acfbe39be6509ccf7fecb66a7e42ce2be1083c2d7dd3b9b7491dabddb8da492908290030190a2837f6012dbce857565c4a40974aa5de8373a761fc429077ef0c8c8611d1e20d63fb26000610681610a1e565b6040805192835260208301919091528051918290030190a26002549250505061072e565b80156106d1576106ca816106c4600254886113af90919063ffffffff16565b90611366565b91506106d5565b8491505b6002546106e29083611408565b60028190556001600160801b031015610701576001600160801b036002555b60025461071790660e3d2cfe61ffff1990611366565b600e55610725818686611462565b50600254925050505b92915050565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107c05780601f10610795576101008083540402835291602001916107c0565b820191906000526020600020905b8154815290600101906020018083116107a357829003601f168201915b5050505050905090565b6008546001600160a01b03163314610829576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6008546040516000916001600160a01b0316907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908390a3600880546001600160a01b0319169055565b3360008181526010602090815260408083206001600160a01b038716808552908352818420869055815186815291519394909390926000805160206117cf833981519152928290030190a350600192915050565b60025490565b600061072e600e54836113af90919063ffffffff16565b6001600160a01b038316600090815260106020908152604080832033845290915281205461091290836115a9565b6001600160a01b0385166000818152601060209081526040808320338085529083529281902085905580519485525191936000805160206117cf833981519152929081900390910190a36000610967836108cd565b6001600160a01b0386166000908152600f602052604090205490915061098d90826115a9565b6001600160a01b038087166000908152600f602052604080822093909355908616815220546109bc9082611408565b6001600160a01b038086166000818152600f602090815260409182902094909455805187815290519193928916927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3506001949350505050565b6000610a2b600d54610da2565b905090565b600d5481565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b60055460ff1690565b60075481565b3360009081526010602090815260408083206001600160a01b0386168452909152812054610a979083611408565b3360008181526010602090815260408083206001600160a01b0389168085529083529281902085905580519485525191936000805160206117cf833981519152929081900390910190a350600192915050565b6008546000906001600160a01b03163314610b4c576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600d5415610b5957600080fd5b610b62826108cd565b600d55506001919050565b6008546001600160a01b03163314610bcc576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b038116610c115760405162461bcd60e51b81526004018080602001828103825260268152602001806117456026913960400191505060405180910390fd5b6008546040516001600160a01b038084169216907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba90600090a3600980546001600160a01b0319166001600160a01b0392909216919091179055565b6008546001600160a01b031690565b6009546001600160a01b03163314610cc55760405162461bcd60e51b815260040180806020018281038252602281526020018061176b6022913960400191505060405180910390fd5b6009546008546040516001600160a01b0392831692909116907faa151555690c956fc3ea32f106bb9f119b5237a061eaa8557cff3e51e3792c8d90600090a3600954600880546001600160a01b0319166001600160a01b03909216919091179055565b600e546001600160a01b0382166000908152600f6020526040812054909161072e9190611366565b600c8181548110610d6057600080fd5b90600052602060002090600702016000915090508060000154908060010154908060020154908060030154908060040154908060050154908060060154905087565b600061072e600e548361136690919063ffffffff16565b6001600160a01b038116600090815260066020526040812061072e906115eb565b600a54600090610a2b90610df6906001600160a01b0316610d28565b600254906115a9565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107c05780601f10610795576101008083540402835291602001916107c0565b600b546001600160a01b031681565b3360009081526010602090815260408083206001600160a01b0386168452909152812054808310610ec3573360009081526010602090815260408083206001600160a01b0388168452909152812055610ef2565b610ecd81846115a9565b3360009081526010602090815260408083206001600160a01b03891684529091529020555b3360008181526010602090815260408083206001600160a01b0389168085529083529281902054815190815290519293926000805160206117cf833981519152929181900390910190a35060019392505050565b600080610f5e600e54846113af90919063ffffffff16565b336000908152600f6020526040902054909150610f7b90826115a9565b336000908152600f6020526040808220929092556001600160a01b03861681522054610fa79082611408565b6001600160a01b0385166000818152600f60209081526040918290209390935580518681529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35060019392505050565b600b546000906001600160a01b0316331461102057600080fd5b6001600160a01b03821661103357600080fd5b600a80546001600160a01b0319166001600160a01b038481169190911780835581166000908152600f60209081526040808320660e3d2cfe61ffff19905593546002548551908152945193169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a3604080516001600160a01b038416815290517f817c653428858ed536dc085c5d8273734c517b55de44b55f5c5877a75e3373a19181900360200190a15050600b80546001600160a01b0319169055600190565b83421115611154576040805162461bcd60e51b815260206004820152601860248201527f5065726d69743a206578706972656420646561646c696e650000000000000000604482015290519081900360640190fd5b6001600160a01b03871660009081526006602052604081207f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c99089908990899061119d906115eb565b604080516020808201979097526001600160a01b0395861681830152939094166060840152608083019190915260a082015260c08082018990528251808303909101815260e08201835280519084012060075461190160f01b610100840152610102830152610122808301829052835180840390910181526101428301808552815191860191909120600091829052610162840180865281905260ff8a166101828501526101a284018990526101c28401889052935191955092936001926101e280820193601f1981019281900390910190855afa158015611283573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906112b95750896001600160a01b0316816001600160a01b0316145b6112f45760405162461bcd60e51b815260040180806020018281038252602181526020018061178d6021913960400191505060405180910390fd5b6001600160a01b038a166000908152600660205260409020611315906115ef565b6113208a8a8a6115f8565b50505050505050505050565b6001600160a01b03918216600090815260106020908152604080832093909416825291909152205490565b600a546001600160a01b031681565b60006113a883836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250611648565b9392505050565b6000826113be5750600061072e565b828202828482816113cb57fe5b04146113a85760405162461bcd60e51b81526004018080602001828103825260218152602001806117ae6021913960400191505060405180910390fd5b6000828201838110156113a8576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b60008061147b856106c486670de0b6b3a76400006113af565b9050600c6040518060e001604052808581526020018381526020018781526020016114a4610dda565b81526020018681526020016114b7610a1e565b81524360209182015282546001818101855560009485529382902083516007909202019081558282015193810193909355604080830151600280860191909155606084015160038601556080840151600486015560a0840151600586015560c0909301516006909401939093559054825142815291820152815185927f917acfbe39be6509ccf7fecb66a7e42ce2be1083c2d7dd3b9b7491dabddb8da4928290030190a2827f6012dbce857565c4a40974aa5de8373a761fc429077ef0c8c8611d1e20d63fb282611586610a1e565b6040805192835260208301919091528051918290030190a2506001949350505050565b60006113a883836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506116ea565b5490565b80546001019055565b6001600160a01b03808416600081815260106020908152604080832094871680845294825291829020859055815185815291516000805160206117cf8339815191529281900390910190a3505050565b600081836116d45760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611699578181015183820152602001611681565b50505050905090810190601f1680156116c65780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385816116e057fe5b0495945050505050565b6000818484111561173c5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315611699578181015183820152602001611681565b50505090039056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a206d757374206265206e6577206f776e657220746f2070756c6c5a65726f537761705065726d69743a20496e76616c6964207369676e6174757265536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f778c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a2646970667358221220eae95c2103e055442b8966d7a812572a65c08bcf365b9e9f183db411353a4a9364736f6c63430007050033";

type SBabelERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SBabelERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SBabelERC20__factory extends ContractFactory {
  constructor(...args: SBabelERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SBabelERC20> {
    return super.deploy(overrides || {}) as Promise<SBabelERC20>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SBabelERC20 {
    return super.attach(address) as SBabelERC20;
  }
  connect(signer: Signer): SBabelERC20__factory {
    return super.connect(signer) as SBabelERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SBabelERC20Interface {
    return new utils.Interface(_abi) as SBabelERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SBabelERC20 {
    return new Contract(address, _abi, signerOrProvider) as SBabelERC20;
  }
}