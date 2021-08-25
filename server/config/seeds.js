const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
	await Category.deleteMany();

	const categories = await Category.insertMany([{ name: 'Food' }, { name: 'Household Supplies' }, { name: 'Electronics' }, { name: 'Books' }, { name: 'Toys' }]);

	console.log('categories seeded');

	await Product.deleteMany();

	const products = await Product.insertMany([
		{
			name: 'Cold Brew Coffee Maker',
			description: 'FRESH COLD BREW ICED COFFEE – This large cold brew filter system creates up to 16 cups of rich, homemade coffee using your favorite grounds for unbeatable flavor.',
			image: 'og.jpg',
			category: categories[1]._id,
			price: 29.99,
			quantity: 500,
		},
		{
			name: 'ICECO Portable Cooler',
			description: 'ICECO JP40 Portable Refrigerator Fridge Freezer, 12V Cooler Refrigerator, 40 Liters Compact Refrigerator with Secop Compressor, for Car & Home Use, 0℉～50℉, DC 12/24V, AC 110/240V ',
			image: 'cooler.jpg',
			category: categories[1]._id,
			price: 529.99,
			quantity: 500,
		},
		{
			name: 'JBL Charge 4 Waterproof Portable Bluetooth Speaker',
			description:
				'Introducing the JBL Charge 4 portable Bluetooth speaker with full-spectrum, powerful sound and a built-in power bank to charge your devices. It features a proprietary developed driver and two JBL bass radiators that intensify sound with strong deep bass.',
			image: 'jbl-speaker.jpg',
			category: categories[1]._id,
			price: 89.99,
			quantity: 500,
		},
		{
			name: 'Swonder Inflatable Paddleboard',
			category: categories[4]._id,
			description:
				'BEGINNER BOARD: The 10-foot long board with 32-inch wide deck gives you a stable surface to learn how to paddleboard. With a non-slip deck and 3 fins underneath for increased maneuverability, you get a hard-shell paddle boards performance along with the easy transportation and storage of an inflatable board.',
			image: 'paddle-board.jpg',
			price: 289.99,
			quantity: 100,
		},
		{
			name: 'Granitestone Pro Pots & Pans 13-Piece Set',
			category: categories[1]._id,
			description: 'Granitestone Pro is constructed from hard anodized which is stronger than stainless steel & standard aluminum cookware. The hard-anodized aluminum exterior is dense, nonporous, highly wear-resistant, and conducts heat incredibly well for the ultimate pro performance.',
			image: 'pots-pans.png',
			price: 179.99,
			quantity: 50,
		},
		{
			name: 'Razer Blade 15 Gaming Laptop 2020',
			category: categories[4]._id,
			description:
				'Game, Create, and Obliterate with the new Razer Blade 15 featuring NVIDIA GeForce RTX 2070 graphics, 10th Gen Intel Core i7 6-core processor, and a stunning OLED 4K (3840 x 2160) display with 1ms response and 100% DCI-P3 colors for visual clarity.',
			image: 'laptop.jpg',
			price: 1679.99,
			quantity: 100,
		},
		{
			name: 'Wusthof 8727 Crafter Block Set, 7-Piece',
			category: categories[1]._id,
			description:
				'3.5\" Paring, 5\" Serrated Utility, 8\" Cook\'s, 9\" Double Serrated Bread Knife, Black Handle Honing Steel, Black Come Apart Shears, 17-Slot Acacia Block',
			image: 'knives.jpg',
			price: 188.99,
			quantity: 50,
		},
		{
			name: 'X Rocker, 5139601, Pro Series Pedestal 2.1 Video Gaming Chair, Black',
			category: categories[2]._id,
			description:
				'ALL PURPOSE PEDESTAL GAMING CHAIR: Leather lounging game chair can be used for playing video games, watching movies and TV, listening to music, reading, and relaxing',
			image: 'gaming-chair.png',
			price: 131.99,
			quantity: 50,
		},
		{
			name: 'FurHaven Sofa Dog Bed',
			category: categories[3]._id,
			description:
				'Perfect for pets young and old, the FurHaven Two-Tone Faux Fur & Suede Sofa-Style Pet Bed is designed to provide your loved one with their own cozy couch for a good night\'s rest.Three different core filling options make it easy to find a bed that meets your pet\'s comfort needs (convolute orthopedic, memory foam top, or cooling gel top). The soft, plush faux fur sleep surface gives your pet a luxurious, snuggly spot to snooze after a long day of play.',
			image: 'pet-bed.png',
			price: 59.99,
			quantity: 100,
		},
		{
			name: 'Spinning Top',
			category: categories[4]._id,
			description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
			image: 'spinning-top.jpg',
			price: 1.99,
			quantity: 1000,
		},
		{
			name: 'Set of Plastic Horses',
			category: categories[4]._id,
			description: 'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
			image: 'plastic-horses.jpg',
			price: 2.99,
			quantity: 1000,
		},
		{
			name: 'Teddy Bear',
			category: categories[4]._id,
			description:
				'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
			image: 'teddy-bear.jpg',
			price: 7.99,
			quantity: 100,
		},
		{
			name: 'Alphabet Blocks',
			category: categories[4]._id,
			description: 'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
			image: 'alphabet-blocks.jpg',
			price: 9.99,
			quantity: 600,
		},
	]);

	console.log('products seeded');

	await User.deleteMany();

	await User.create({
		firstName: 'Pamela',
		lastName: 'Washington',
		email: 'pamela@testmail.com',
		password: 'password12345',
		orders: [
			{
				products: [products[0]._id, products[0]._id, products[1]._id],
			},
		],
		admin: false,
	});

	await User.create({
		firstName: 'Elijah',
		lastName: 'Holt',
		email: 'eholt@testmail.com',
		password: 'password12345',
		admin: false,
	});

	console.log('users seeded');

	process.exit();
});
