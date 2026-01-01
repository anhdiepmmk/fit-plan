// Dữ liệu thực đơn và hàm xử lý chọn món theo giới tính

const RAW_FOOD_POOLS = {
    morning: [
        { 
            name: "Phở gà (ít bánh)", 
            desc: "Nước dùng trong, nhiều rau thơm, ức gà xé",
            descMale: "Nước dùng trong, nhiều rau thơm, ức gà xé, thêm trứng trần (bát lớn)"
        },
        { 
            name: "Bún mọc", 
            desc: "Nước dùng thanh, mọc nạc, nhiều dọc mùng",
            descMale: "Nước dùng thanh, mọc nạc, nhiều dọc mùng, thêm giò (bát lớn)"
        },
        { 
            name: "Cháo yến mạch thịt bằm", 
            desc: "Yến mạch, thịt nạc bằm, hành lá, tiêu",
            descMale: "Yến mạch, 150g thịt nạc bằm, hành lá, tiêu (tô lớn)"
        },
        { 
            name: "Bánh mì đen & Trứng ốp", 
            desc: "2 lát bánh mì nguyên cám, 1 trứng, xà lách",
            descMale: "3 lát bánh mì nguyên cám, 2 trứng ốp, xà lách"
        },
        { 
            name: "Sữa chua & Hạt điều", 
            desc: "Sữa chua không đường, ngũ cốc hạt, trái cây ít ngọt",
            descMale: "2 hộp sữa chua không đường, nhiều ngũ cốc hạt, chuối"
        },
        { 
            name: "Khoai lang luộc & Sữa hạt", 
            desc: "1 củ khoai vừa, 200ml sữa hạnh nhân không đường",
            descMale: "2 củ khoai vừa, 300ml sữa hạnh nhân không đường"
        },
        { 
            name: "Trứng xào cà chua & Bánh mì", 
            desc: "1 quả trứng, cà chua, bánh mì đen",
            descMale: "2 quả trứng, cà chua, 2 lát bánh mì đen"
        },
        { 
            name: "Bún thang (nhỏ)", 
            desc: "Nhiều rau, trứng thái chỉ, giò lụa nạc, gà xé",
            descMale: "Bún thang đầy đủ, thêm gà xé và giò lụa"
        },
        { 
            name: "Xôi đậu xanh (nhỏ)", 
            desc: "Lượng xôi vừa phải, ăn kèm muối vừng",
            descMale: "Xôi đậu xanh, ăn kèm muối vừng và chả nạc"
        },
        { 
            name: "Nui lứt nấu thịt băm", 
            desc: "Nui gạo lứt, nước dùng rau củ, thịt nạc",
            descMale: "Nui gạo lứt, nước dùng rau củ, nhiều thịt nạc băm (tô lớn)"
        }
    ],
    lunch: [
        { 
            name: "Ức gà áp chảo & Súp lơ", 
            desc: "150g gà, súp lơ xanh luộc, nửa bát cơm lứt",
            descMale: "200g gà, súp lơ xanh luộc, 1 bát cơm lứt"
        },
        { 
            name: "Bò xào thiên lý", 
            desc: "100g thịt bò mỏng, hoa thiên lý, ít dầu mỡ",
            descMale: "150g thịt bò mỏng, hoa thiên lý, 1 bát cơm lứt"
        },
        { 
            name: "Tôm rim mặn ngọt & Rau cải", 
            desc: "150g tôm, cải chíp luộc, nửa bát cơm lứt",
            descMale: "200g tôm, cải chíp luộc, 1 bát cơm lứt"
        },
        { 
            name: "Cá thu kho & Rau muống", 
            desc: "1 khúc cá thu nhỏ, rau muống luộc lấy nước chanh",
            descMale: "2 khúc cá thu, rau muống luộc, 1 bát cơm"
        },
        { 
            name: "Thịt lợn luộc & Dưa chuột", 
            desc: "100g thịt thăn luộc, dưa chuột tươi, canh rau ngót",
            descMale: "150g thịt thăn luộc, dưa chuột tươi, canh rau ngót, 1 bát cơm"
        },
        { 
            name: "Mực xào cần tỏi", 
            desc: "150g mực, cần tây, tỏi tây, ít cơm lứt",
            descMale: "250g mực, cần tây, tỏi tây, 1 bát cơm lứt"
        },
        { 
            name: "Đậu phụ sốt cà chua", 
            desc: "2 bìa đậu, cà chua tươi, canh rau cải",
            descMale: "3-4 bìa đậu, cà chua tươi, canh rau cải, thịt băm"
        },
        { 
            name: "Gà rang gừng & Bắp cải", 
            desc: "100g gà bỏ da, bắp cải luộc, 1 bát cơm lứt",
            descMale: "150g gà bỏ da, bắp cải luộc, 1.5 bát cơm lứt"
        },
        { 
            name: "Cá diêu hồng hấp gừng", 
            desc: "Cá hấp, nhiều rau sống cuốn, không ăn kèm bún",
            descMale: "Nửa con cá hấp, nhiều rau sống cuốn, ăn kèm ít bún"
        },
        { 
            name: "Canh chua cá lóc", 
            desc: "Cá lóc, dứa, cà chua, dọc mùng, ít cơm",
            descMale: "2 khứa cá lóc, dứa, cà chua, dọc mùng, 1 bát cơm"
        }
    ],
    evening: [
        { 
            name: "Salad ức gà xé", 
            desc: "Ức gà, xà lách, sốt mè, nhiều dưa chuột",
            descMale: "200g ức gà, xà lách, sốt mè, thêm trứng luộc"
        },
        { 
            name: "Canh đậu phụ rong biển", 
            desc: "Đậu phụ, rong biển, tôm khô/thịt băm, thanh đạm",
            descMale: "Đậu phụ, rong biển, nhiều thịt nạc băm, ăn kèm 1 lát cá"
        },
        { 
            name: "Cá hồi nướng măng tây", 
            desc: "100g cá hồi, măng tây, bí đỏ luộc",
            descMale: "150g cá hồi, măng tây, bí đỏ luộc, khoai tây nghiền"
        },
        { 
            name: "Nộm sứa & Rau thơm", 
            desc: "Sứa, đu đủ xanh, cà rốt, lạc rang ít",
            descMale: "Nộm sứa, đu đủ chanh, thêm thịt bò khô hoặc tai heo"
        },
        { 
            name: "Canh bí đỏ nấu tôm", 
            desc: "Bí đỏ, tôm tươi, rau dền/mồng tơi",
            descMale: "Canh bí đỏ nấu tôm (nhiều tôm), ăn kèm thịt rang cháy cạnh"
        },
        { 
            name: "Lẩu rau nấm (mini)", 
            desc: "Nấm các loại, đậu phụ, rau xanh, không mì",
            descMale: "Nấm các loại, đậu phụ, rau xanh, thêm thịt bò chần, ít mì"
        },
        { 
            name: "Súp gà ngô non", 
            desc: "Gà xé, ngô ngọt, nấm hương, ít bột năng",
            descMale: "Súp gà ngô non (bát lớn), nhiều gà xé"
        },
        { 
            name: "Bún xào rau củ", 
            desc: "Bún gạo lứt, nhiều rau cải, mộc nhĩ, đậu phụ",
            descMale: "Bún gạo lứt, rau cải, đậu phụ, thêm thịt bò xào"
        },
        { 
            name: "Thịt bò trộn salad", 
            desc: "Bò tái lăn, xà lách, hành tây, cà chua bi",
            descMale: "150g bò tái lăn, xà lách, hành tây, cà chua bi"
        },
        { 
            name: "Trái cây & Hạt chia", 
            desc: "Táo/Bưởi, sữa hạt, hạt chia (nhẹ bụng)",
            descMale: "Táo/Bưởi, sữa hạt, hạt chia, thêm 1 lát bánh mì bơ lạc"
        }
    ]
};

/**
 * Lấy danh sách món ăn theo giới tính
 * @param {string} gender - 'male' hoặc 'female'
 * @returns {Object} - Object chứa các mảng morning, lunch, evening đã được xử lý mô tả
 */
function getFoodData(gender) {
    const processList = (list) => list.map(item => {
        // Nếu là nam và có mô tả riêng cho nam (descMale) thì dùng, ngược lại dùng desc mặc định
        const description = (gender === 'male' && item.descMale) ? item.descMale : item.desc;
        
        return {
            name: item.name,
            desc: description
        };
    });

    return {
        morning: processList(RAW_FOOD_POOLS.morning),
        lunch: processList(RAW_FOOD_POOLS.lunch),
        evening: processList(RAW_FOOD_POOLS.evening)
    };
}
