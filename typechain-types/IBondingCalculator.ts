/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface IBondingCalculatorInterface extends ethers.utils.Interface {
  functions: {
    "valuation(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "valuation",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "valuation", data: BytesLike): Result;

  events: {};
}

export interface IBondingCalculator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IBondingCalculatorInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    valuation(
      pair_: string,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _value: BigNumber }>;
  };

  valuation(
    pair_: string,
    amount_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    valuation(
      pair_: string,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    valuation(
      pair_: string,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    valuation(
      pair_: string,
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
