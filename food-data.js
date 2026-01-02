// Dữ liệu thực đơn và hàm xử lý chọn món theo giới tính

const RAW_FOOD_POOLS = {
    morning: [
        { 
            name: "Phở gà (ít bánh)", 
            desc: "Nước dùng trong, nhiều rau thơm, ức gà xé",
            descMale: "Nước dùng trong, nhiều rau thơm, ức gà xé, thêm trứng trần (bát lớn)",
            gain: { name: "Phở gà đặc biệt", desc: "Nhiều bánh, nhiều thịt đùi & da, thêm trứng trần, quẩy" }
        },
        { 
            name: "Bún mọc", 
            desc: "Nước dùng thanh, mọc nạc, nhiều dọc mùng",
            descMale: "Nước dùng thanh, mọc nạc, nhiều dọc mùng, thêm giò (bát lớn)",
            gain: { desc: "Bún mọc thêm móng giò, mọc, giò lụa (bát lớn)" }
        },
        { 
            name: "Cháo yến mạch thịt bằm", 
            desc: "Yến mạch, thịt nạc bằm, hành lá, tiêu",
            descMale: "Yến mạch, 150g thịt nạc bằm, hành lá, tiêu (tô lớn)",
            gain: { name: "Cháo sườn sụn", desc: "Cháo nấu trai/sườn sụn, thêm quẩy giòn và trứng bắc thảo" }
        },
        { 
            name: "Bánh mì đen & Trứng ốp", 
            desc: "2 lát bánh mì nguyên cám, 1 trứng, xà lách",
            descMale: "3 lát bánh mì nguyên cám, 2 trứng ốp, xà lách",
            gain: { name: "Bánh mì chảo", desc: "2 trứng ốp, pate, xúc xích, 2 bánh mì thường" }
        },
        { 
            name: "Sữa chua & Hạt điều", 
            desc: "Sữa chua không đường, ngũ cốc hạt, trái cây ít ngọt",
            descMale: "2 hộp sữa chua không đường, nhiều ngũ cốc hạt, chuối",
            gain: { desc: "Sữa chua có đường, nhiều hạt điều, nho khô, thêm 1 bánh ngọt" }
        },
        { 
            name: "Khoai lang luộc & Sữa hạt", 
            desc: "1 củ khoai vừa, 200ml sữa hạnh nhân không đường",
            descMale: "2 củ khoai vừa, 300ml sữa hạnh nhân không đường",
            gain: { name: "Xôi xéo", desc: "Xôi xéo mỡ hành, đậu xanh, chả mỡ, ruốc" }
        },
        { 
            name: "Trứng xào cà chua & Bánh mì", 
            desc: "1 quả trứng, cà chua, bánh mì đen",
            descMale: "2 quả trứng, cà chua, 2 lát bánh mì đen",
            gain: { desc: "2 trứng xào nhiều dầu, thêm thịt băm, chấm bánh mì" }
        },
        { 
            name: "Bún thang (nhỏ)", 
            desc: "Nhiều rau, trứng thái chỉ, giò lụa nạc, gà xé",
            descMale: "Bún thang đầy đủ, thêm gà xé và giò lụa",
            gain: { desc: "Bún thang đầy đủ, thêm nhiều giò, trứng, gà" }
        },
        { 
            name: "Xôi đậu xanh (nhỏ)", 
            desc: "Lượng xôi vừa phải, ăn kèm muối vừng",
            descMale: "Xôi đậu xanh, ăn kèm muối vừng và chả nạc",
            gain: { desc: "Xôi đậu xanh, thịt kho tàu, trứng kho, chả" }
        },
        { 
            name: "Nui lứt nấu thịt băm", 
            desc: "Nui gạo lứt, nước dùng rau củ, thịt nạc",
            descMale: "Nui gạo lứt, nước dùng rau củ, nhiều thịt nạc băm (tô lớn)",
            gain: { name: "Nui xương hầm", desc: "Nui nấu xương heo hầm mềm, cà rốt, khoai tây" }
        }
    ],
    lunch: [
        { 
            name: "Ức gà áp chảo & Súp lơ", 
            desc: "150g gà, súp lơ xanh luộc, nửa bát cơm lứt",
            descMale: "200g gà, súp lơ xanh luộc, 1 bát cơm lứt",
            gain: { name: "Gà rán & Khoai tây", desc: "Đùi gà chiên giòn, khoai tây chiên, 1 bát cơm đầy" }
        },
        { 
            name: "Bò xào thiên lý", 
            desc: "100g thịt bò mỏng, hoa thiên lý, ít dầu mỡ",
            descMale: "150g thịt bò mỏng, hoa thiên lý, 1 bát cơm lứt",
            gain: { desc: "Thịt bò xào thiên lý (xào mỡ), 2 bát cơm trắng" }
        },
        { 
            name: "Tôm rim mặn ngọt & Rau cải", 
            desc: "150g tôm, cải chíp luộc, nửa bát cơm lứt",
            descMale: "200g tôm, cải chíp luộc, 1 bát cơm lứt",
            gain: { desc: "Tôm rim thịt ba chỉ, canh cải nấu thịt, 2 bát cơm" }
        },
        { 
            name: "Cá thu kho & Rau muống", 
            desc: "1 khúc cá thu nhỏ, rau muống luộc lấy nước chanh",
            descMale: "2 khúc cá thu, rau muống luộc, 1 bát cơm",
            gain: { desc: "Cá thu kho tộ (nhiều sốt), rau muống xào tỏi, 2 bát cơm" }
        },
        { 
            name: "Thịt lợn luộc & Dưa chuột", 
            desc: "100g thịt thăn luộc, dưa chuột tươi, canh rau ngót",
            descMale: "150g thịt thăn luộc, dưa chuột tươi, canh rau ngót, 1 bát cơm",
            gain: { name: "Thịt quay giòn bì", desc: "Thịt quay, dưa chua, canh sườn, 2 bát cơm" }
        },
        { 
            name: "Mực xào cần tỏi", 
            desc: "150g mực, cần tây, tỏi tây, ít cơm lứt",
            descMale: "250g mực, cần tây, tỏi tây, 1 bát cơm lứt",
            gain: { desc: "Mực xào cần tỏi nhiều dầu, thêm chả mực, 2 bát cơm" }
        },
        { 
            name: "Đậu phụ sốt cà chua", 
            desc: "2 bìa đậu, cà chua tươi, canh rau cải",
            descMale: "3-4 bìa đậu, cà chua tươi, canh rau cải, thịt băm",
            gain: { name: "Đậu nhồi thịt sốt cà", desc: "Đậu nhồi thịt chiên sốt cà chua, canh cua, 2 bát cơm" }
        },
        { 
            name: "Gà rang gừng & Bắp cải", 
            desc: "100g gà bỏ da, bắp cải luộc, 1 bát cơm lứt",
            descMale: "150g gà bỏ da, bắp cải luộc, 1.5 bát cơm lứt",
            gain: { name: "Gà kho gừng (cả da)", desc: "Gà kho đậm đà, bắp cải xào, 2 bát cơm" }
        },
        { 
            name: "Cá diêu hồng hấp gừng", 
            desc: "Cá hấp, nhiều rau sống cuốn, không ăn kèm bún",
            descMale: "Nửa con cá hấp, nhiều rau sống cuốn, ăn kèm ít bún",
            gain: { name: "Cá chiên xù", desc: "Cá diêu hồng chiên xù, chấm mắm me, ăn với bún/cơm" }
        },
        { 
            name: "Canh chua cá lóc", 
            desc: "Cá lóc, dứa, cà chua, dọc mùng, ít cơm",
            descMale: "2 khứa cá lóc, dứa, cà chua, dọc mùng, 1 bát cơm",
            gain: { desc: "Canh chua cá lóc (khúc to), thêm thịt kho tiêu, 2 bát cơm" }
        }
    ],
    evening: [
        { 
            name: "Salad ức gà xé", 
            desc: "Ức gà, xà lách, sốt mè, nhiều dưa chuột",
            descMale: "200g ức gà, xà lách, sốt mè, thêm trứng luộc",
            gain: { name: "Cơm gà xối mỡ", desc: "Gà chiên mắm, cơm đảo rang trứng, salad dầu giấm" }
        },
        { 
            name: "Canh đậu phụ rong biển", 
            desc: "Đậu phụ, rong biển, tôm khô/thịt băm, thanh đạm",
            descMale: "Đậu phụ, rong biển, nhiều thịt nạc băm, ăn kèm 1 lát cá",
            gain: { desc: "Canh sườn rong biển, đậu rán tẩm hành, 2 bát cơm" }
        },
        { 
            name: "Cá hồi nướng măng tây", 
            desc: "100g cá hồi, măng tây, bí đỏ luộc",
            descMale: "150g cá hồi, măng tây, bí đỏ luộc, khoai tây nghiền",
            gain: { name: "Cá hồi áp chảo sốt kem", desc: "Cá hồi sốt kem chanh, khoai tây nghiền nhiều bơ" }
        },
        { 
            name: "Nộm sứa & Rau thơm", 
            desc: "Sứa, đu đủ xanh, cà rốt, lạc rang ít",
            descMale: "Nộm sứa, đu đủ chanh, thêm thịt bò khô hoặc tai heo",
            gain: { name: "Bò nướng lá lốt", desc: "Bò cuốn lá lốt, bánh hỏi, mỡ hành, đậu phộng" }
        },
        { 
            name: "Canh bí đỏ nấu tôm", 
            desc: "Bí đỏ, tôm tươi, rau dền/mồng tơi",
            descMale: "Canh bí đỏ nấu tôm (nhiều tôm), ăn kèm thịt rang cháy cạnh",
            gain: { desc: "Canh bí đỏ sườn heo, thịt ba chỉ rang cháy cạnh, 2 bát cơm" }
        },
        { 
            name: "Lẩu rau nấm (mini)", 
            desc: "Nấm các loại, đậu phụ, rau xanh, không mì",
            descMale: "Nấm các loại, đậu phụ, rau xanh, thêm thịt bò chần, ít mì",
            gain: { name: "Lẩu bò nhúng dấm", desc: "Thịt gầu bò, bắp bò, rau cải, bánh đa, phồng tôm" }
        },
        { 
            name: "Súp gà ngô non", 
            desc: "Gà xé, ngô ngọt, nấm hương, ít bột năng",
            descMale: "Súp gà ngô non (bát lớn), nhiều gà xé",
            gain: { name: "Cơm rang dưa bò", desc: "Cơm rang trứng, dưa chua, thịt bò xào đậm đà" }
        },
        { 
            name: "Bún xào rau củ", 
            desc: "Bún gạo lứt, nhiều rau cải, mộc nhĩ, đậu phụ",
            descMale: "Bún gạo lứt, rau cải, đậu phụ, thêm thịt bò xào",
            gain: { name: "Mì xào bò", desc: "Mì tôm xào bò, rau cải ngọt, thêm ốp la" }
        },
        { 
            name: "Thịt bò trộn salad", 
            desc: "Bò tái lăn, xà lách, hành tây, cà chua bi",
            descMale: "150g bò tái lăn, xà lách, hành tây, cà chua bi",
            gain: { name: "Bò bít tết", desc: "Bò bít tết (200g), khoai tây chiên, bánh mì, trứng ốp" }
        },
        { 
            name: "Trái cây & Hạt chia", 
            desc: "Táo/Bưởi, sữa hạt, hạt chia (nhẹ bụng)",
            descMale: "Táo/Bưởi, sữa hạt, hạt chia, thêm 1 lát bánh mì bơ lạc",
            gain: { name: "Chè thập cẩm", desc: "Chè đậu, nước cốt dừa, dừa khô, trân châu" }
        }
    ]
};

/**
 * Lấy danh sách món ăn theo giới tính và mục tiêu
 * @param {string} gender - 'male' hoặc 'female'
 * @param {string} goal - 'maintain', 'lose-slow', 'gain-medium', etc.
 * @returns {Object} - Object chứa các mảng morning, lunch, evening đã được xử lý mô tả
 */
function getFoodData(gender, goal) {
    const isGain = goal && goal.startsWith('gain');

    const processList = (list) => list.map(item => {
        let name = item.name;
        let description = item.desc;

        if (isGain) {
            // Logic cho tăng cân
            if (item.gain) {
                name = item.gain.name || name; // Lấy tên món tăng cân nếu có
                description = item.gain.desc;   // Lấy mô tả món tăng cân
            } else if (item.descMale) {
                // Fallback: dùng khẩu phần nam (thường lớn hơn) nếu không có menu tăng cân riêng
                description = item.descMale;
            }
        } else {
            // Logic cũ cho giảm cân / giữ cân
            if (gender === 'male' && item.descMale) {
                description = item.descMale;
            }
        }
        
        return {
            name: name,
            desc: description
        };
    });

    return {
        morning: processList(RAW_FOOD_POOLS.morning),
        lunch: processList(RAW_FOOD_POOLS.lunch),
        evening: processList(RAW_FOOD_POOLS.evening)
    };
}
