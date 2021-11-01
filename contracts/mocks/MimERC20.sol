// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract MimERC20 is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("Magic Internet Money", "MIM") {}
}
