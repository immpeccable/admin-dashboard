export const ENDPOINT = "http://3.95.33.82:80";

export const SIGN_MESSAGE = "sign";

export const address = "0x158bab8b48114DC0bDB9201218B9A327B45b9C90";

export const abi = [
	{
		inputs: [
			{ internalType: "address[]", name: "_admins", type: "address[]" },
			{ internalType: "uint256", name: "adminCount", type: "uint256" },
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
				name: "admin",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newAdmin",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "districtKey",
				type: "uint256",
			},
		],
		name: "AdminAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "admin",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "districtKey",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "boxKey",
				type: "uint256",
			},
		],
		name: "UserPermitted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "boxKey",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "KEMAL_KILICDAROGLU",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "MUHARREM_INCE",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "RECEP_TAYYIP_ERDOGAN",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "_url",
				type: "string",
			},
		],
		name: "VoteResultAddded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "boxKey",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "KEMAL_KILICDAROGLU",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "MUHARREM_INCE",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "RECEP_TAYYIP_ERDOGAN",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "_url",
				type: "string",
			},
		],
		name: "VoteResultOverriden",
		type: "event",
	},
	{
		inputs: [],
		name: "ADMIN_VALUE",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "_districtKey", type: "uint256" },
			{ internalType: "address", name: "_newAdmin", type: "address" },
		],
		name: "addAdmin",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "_boxKey", type: "uint256" },
			{ internalType: "uint256", name: "_kilicdar", type: "uint256" },
			{ internalType: "uint256", name: "_muharrem", type: "uint256" },
			{ internalType: "uint256", name: "_rte", type: "uint256" },
			{ internalType: "string", name: "_url", type: "string" },
		],
		name: "addVoteResult",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "admins",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "_user", type: "address" }],
		name: "checkAdmin",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_user", type: "address" },
			{ internalType: "uint256", name: "_boxKey", type: "uint256" },
		],
		name: "checkUserPermission",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "_user", type: "address" },
			{ internalType: "uint256", name: "_boxKey", type: "uint256" },
		],
		name: "getBoxResult",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "KEMAL_KILICDAROGLU",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "MUHARREM_INCE",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "RECEP_TAYYIP_ERDOGAN",
						type: "uint256",
					},
					{ internalType: "string", name: "url", type: "string" },
				],
				internalType: "struct BallotSystem.CBResult",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "_districtKey", type: "uint256" },
			{ internalType: "uint256", name: "_boxKey", type: "uint256" },
			{
				internalType: "address",
				name: "_newPermission",
				type: "address",
			},
		],
		name: "givePermission",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "_boxKey", type: "uint256" },
			{ internalType: "uint256", name: "_kilicdar", type: "uint256" },
			{ internalType: "uint256", name: "_muharrem", type: "uint256" },
			{ internalType: "uint256", name: "_rte", type: "uint256" },
			{ internalType: "string", name: "_url", type: "string" },
		],
		name: "overrideVoteResult",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "", type: "uint256" },
			{ internalType: "address", name: "", type: "address" },
		],
		name: "permissions",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "", type: "uint256" },
			{ internalType: "address", name: "", type: "address" },
		],
		name: "results",
		outputs: [
			{
				internalType: "uint256",
				name: "KEMAL_KILICDAROGLU",
				type: "uint256",
			},
			{ internalType: "uint256", name: "MUHARREM_INCE", type: "uint256" },
			{
				internalType: "uint256",
				name: "RECEP_TAYYIP_ERDOGAN",
				type: "uint256",
			},
			{ internalType: "string", name: "url", type: "string" },
		],
		stateMutability: "view",
		type: "function",
	},
];

