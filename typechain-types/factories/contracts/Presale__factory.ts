/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Presale, PresaleInterface } from "../../contracts/Presale";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
      {
        internalType: "contract TinToken",
        name: "_token",
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
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "buyTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    name: "rate",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "setRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newWallet",
        type: "address",
      },
    ],
    name: "setWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract TinToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "transferAllTokensToOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "transferToWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wallet",
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
    name: "weiRaised",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516107e63803806107e683398101604081905261002f916100d7565b6100383361006f565b600392909255600280546001600160a01b039283166001600160a01b0319918216179091556001805492909316911617905561011a565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146100d457600080fd5b50565b6000806000606084860312156100ec57600080fd5b8351925060208401516100fe816100bf565b604085015190925061010f816100bf565b809150509250925092565b6106bd806101296000396000f3fe6080604052600436106100ab5760003560e01c80638bd8669e116100645780638bd8669e1461017a5780638da5cb5b1461018f578063d0febe4c146101ad578063deaa59df146101b5578063f2fde38b146101d5578063fc0c546a146101f557600080fd5b80632c4e722e146100b757806334fcf437146100e05780634042b66f146101025780634870b81d14610118578063521eb2731461012d578063715018a61461016557600080fd5b366100b257005b600080fd5b3480156100c357600080fd5b506100cd60035481565b6040519081526020015b60405180910390f35b3480156100ec57600080fd5b506101006100fb3660046105bd565b610215565b005b34801561010e57600080fd5b506100cd60045481565b34801561012457600080fd5b50610100610222565b34801561013957600080fd5b5060025461014d906001600160a01b031681565b6040516001600160a01b0390911681526020016100d7565b34801561017157600080fd5b50610100610267565b34801561018657600080fd5b5061010061027b565b34801561019b57600080fd5b506000546001600160a01b031661014d565b610100610381565b3480156101c157600080fd5b506101006101d03660046105d6565b61046e565b3480156101e157600080fd5b506101006101f03660046105d6565b610498565b34801561020157600080fd5b5060015461014d906001600160a01b031681565b61021d610513565b600355565b61022a610513565b600080546040516001600160a01b03909116914780156108fc02929091818181858888f19350505050158015610264573d6000803e3d6000fd5b50565b61026f610513565b610279600061056d565b565b610283610513565b6001546001600160a01b031663a9059cbb6102a66000546001600160a01b031690565b6001546040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa1580156102ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103129190610606565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af115801561035d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610264919061061f565b3460000361038e57600080fd5b60006003543461039e9190610657565b9050346004546103ae9190610674565b600490815560015460405163a9059cbb60e01b81523392810192909252602482018390526001600160a01b03169063a9059cbb906044016020604051808303816000875af1158015610404573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610428919061061f565b61043157600080fd5b6002546040516001600160a01b03909116903480156108fc02916000818181858888f1935050505015801561046a573d6000803e3d6000fd5b5050565b610476610513565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b6104a0610513565b6001600160a01b03811661050a5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6102648161056d565b6000546001600160a01b031633146102795760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610501565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156105cf57600080fd5b5035919050565b6000602082840312156105e857600080fd5b81356001600160a01b03811681146105ff57600080fd5b9392505050565b60006020828403121561061857600080fd5b5051919050565b60006020828403121561063157600080fd5b815180151581146105ff57600080fd5b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761066e5761066e610641565b92915050565b8082018082111561066e5761066e61064156fea26469706673582212205a6bf451ce8cdb60e9b0326cd23c8fbb11db9a9eada8f8f00f1aa1cbfdf0355664736f6c63430008130033";

type PresaleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PresaleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Presale__factory extends ContractFactory {
  constructor(...args: PresaleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _rate: PromiseOrValue<BigNumberish>,
    _wallet: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Presale> {
    return super.deploy(
      _rate,
      _wallet,
      _token,
      overrides || {}
    ) as Promise<Presale>;
  }
  override getDeployTransaction(
    _rate: PromiseOrValue<BigNumberish>,
    _wallet: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_rate, _wallet, _token, overrides || {});
  }
  override attach(address: string): Presale {
    return super.attach(address) as Presale;
  }
  override connect(signer: Signer): Presale__factory {
    return super.connect(signer) as Presale__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PresaleInterface {
    return new utils.Interface(_abi) as PresaleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Presale {
    return new Contract(address, _abi, signerOrProvider) as Presale;
  }
}
