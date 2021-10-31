/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { StakingWarmup, StakingWarmupInterface } from "../StakingWarmup";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_staking",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sBABEL",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_staker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "retrieve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sBABEL",
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
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516102b43803806102b48339818101604052604081101561003357600080fd5b5080516020909101516001600160a01b03821661004f57600080fd5b6001600160601b0319606083901b166080526001600160a01b03811661007457600080fd5b606081811b6001600160601b03191660a052608051901c91506001600160a01b03166101fa6100ba6000398060c6528061011f52508060a2528060f352506101fa6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80634cf088d914610046578063a0b0b53f1461006a578063c3a2a66514610072575b600080fd5b61004e6100a0565b604080516001600160a01b039092168252519081900360200190f35b61004e6100c4565b61009e6004803603604081101561008857600080fd5b506001600160a01b0381351690602001356100e8565b005b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461011d57600080fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a9059cbb83836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561019457600080fd5b505af11580156101a8573d6000803e3d6000fd5b505050506040513d60208110156101be57600080fd5b5050505056fea2646970667358221220adac02aa5709eae43e8ede0bf0bb0a6abdadb2f94415551f366a7a27910a690b64736f6c63430007050033";

type StakingWarmupConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingWarmupConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakingWarmup__factory extends ContractFactory {
  constructor(...args: StakingWarmupConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _staking: string,
    _sBABEL: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StakingWarmup> {
    return super.deploy(
      _staking,
      _sBABEL,
      overrides || {}
    ) as Promise<StakingWarmup>;
  }
  getDeployTransaction(
    _staking: string,
    _sBABEL: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_staking, _sBABEL, overrides || {});
  }
  attach(address: string): StakingWarmup {
    return super.attach(address) as StakingWarmup;
  }
  connect(signer: Signer): StakingWarmup__factory {
    return super.connect(signer) as StakingWarmup__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingWarmupInterface {
    return new utils.Interface(_abi) as StakingWarmupInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingWarmup {
    return new Contract(address, _abi, signerOrProvider) as StakingWarmup;
  }
}