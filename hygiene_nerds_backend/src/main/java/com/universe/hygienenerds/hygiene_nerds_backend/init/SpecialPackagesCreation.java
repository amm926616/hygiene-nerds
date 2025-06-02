package com.universe.hygienenerds.hygiene_nerds_backend.init;//package com.universe.hygienenerds.hygiene_nerds_backend.init;
//
//import com.universe.hygienenerds.hygiene_nerds_backend.dao.ProductDao;
//import com.universe.hygienenerds.hygiene_nerds_backend.entity.Product;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static com.universe.hygienenerds.hygiene_nerds_backend.init.InitApplication.createSpecialPackage;
//
//@Component
//@RequiredArgsConstructor
//public class SpecialPackagesCreation {
//    private final ProductDao productDao;
//
//    public void createProductsForSpecialPacakges() {
//        // ================= ORAL CARE PRODUCTS =================
//        Product toothbrush = new Product("Toothbrush", "Soft bristle toothbrush", "Oral-B", 4.00, "oral-brush.jpg", "oral-care", 150);
//        Product mouthwash = new Product("Mouthwash", "Antiseptic mouthwash", "Listerine", 7.00, "listerine.jpg", "oral-care", 100);
//        Product dentalFloss = new Product("Dental Floss", "Waxed floss 50m", "Glide", 3.00, "floss.jpg", "oral-care", 300);
//        Product electricBrush = new Product("Electric Toothbrush", "Rechargeable", "Philips Sonicare", 89.99, "sonicare.jpg", "oral-care", 75);
//        Product whiteningPaste = new Product("Whitening Toothpaste", "Enamel-safe", "Colgate Optic", 8.50, "optic-white.jpg", "oral-care", 200);
//
//// ================= CLEANING PRODUCTS =================
//        Product allPurposeCleaner = new Product("All-Purpose Cleaner", "Lemon scent", "Lysol", 5.99, "lysol.jpg", "cleaning", 120);
//        Product microfiberCloths = new Product("Microfiber Cloths", "12-pack", "Swiffer", 9.99, "swiffer.jpg", "cleaning", 80);
//        Product dishSoap = new Product("Dish Soap", "Ultra-concentrated", "Dawn", 4.50, "dawn.jpg", "cleaning", 150);
//        Product scrubBrush = new Product("Scrub Brush", "Ergonomic handle", "O-Cedar", 6.25, "scrub-brush.jpg", "cleaning", 60);
//
//// ================= BATH & BODY =================
//        Product bodyWash = new Product("Body Wash", "Coconut milk", "Bath & Body Works", 12.50, "bbw-wash.jpg", "bath", 90);
//        Product loofah = new Product("Exfoliating Loofah", "Bamboo", "Earth Therapeutics", 8.00, "loofah.jpg", "bath", 110);
//        Product bodyLotion = new Product("Body Lotion", "Shea butter", "Nivea", 7.50, "nivea-lotion.jpg", "bath", 95);
//        Product bathSalts = new Product("Bath Salts", "Lavender", "Dr. Teal's", 9.25, "teals-salts.jpg", "bath", 70);
//
//// ================= ECO-FRIENDLY =================
//        Product bambooToothbrush = new Product("Bamboo Toothbrush", "Biodegradable", "Brush with Bamboo", 5.99, "bamboo-brush.jpg", "eco", 85);
//        Product refillSoap = new Product("Soap Refill", "Almond-scented", "Ecos", 12.00, "ecos-refill.jpg", "eco", 45);
//        Product reusableBags = new Product("Reusable Bags", "3-pack foldable", "BagPodz", 15.00, "bagpodz.jpg", "eco", 50);
//
//// ================= TRAVEL ESSENTIALS =================
//        Product travelToothpaste = new Product("Travel Toothpaste", "1oz TSA-approved", "Crest", 2.50, "crest-travel.jpg", "travel", 180);
//        Product miniDeodorant = new Product("Mini Deodorant", "Travel-size", "Dove", 3.25, "dove-mini.jpg", "travel", 130);
//        Product wetWipes = new Product("Antibacterial Wipes", "10-count", "Wet Ones", 1.99, "wet-ones.jpg", "travel", 200);
//
//// ======== SAVE ALL PRODUCTS TO DATABASE ========
//        productDao.save(toothbrush);
//        productDao.save(mouthwash);
//        productDao.save(dentalFloss);
//        productDao.save(electricBrush);
//        productDao.save(whiteningPaste);
//        productDao.save(allPurposeCleaner);
//        productDao.save(microfiberCloths);
//        productDao.save(dishSoap);
//        productDao.save(scrubBrush);
//        productDao.save(bodyWash);
//        productDao.save(loofah);
//        productDao.save(bodyLotion);
//        productDao.save(bathSalts);
//        productDao.save(bambooToothbrush);
//        productDao.save(refillSoap);
//        productDao.save(reusableBags);
//        productDao.save(travelToothpaste);
//        productDao.save(miniDeodorant);
//        productDao.save(wetWipes);
//
//
//        // ================= PACKAGE 1: Premium Oral Care (3-Month Supply) =================
//        List<Product> premiumOral = Arrays.asList(
//                electricBrush,  // Rechargeable lasts 3+ months
//                whiteningPaste, // 4oz tube (3-month supply)
//                mouthwash,      // 1L bottle (3-month supply)
//                dentalFloss     // 50m pack (3-month supply)
//        );
//        createSpecialPackage("Premium Oral Care Package", 90, premiumOral); // 90 days = ~3 months
//
//// ================= PACKAGE 2: Home Cleaning Starter (2-Month Kit) =================
//        List<Product> cleaningKit = Arrays.asList(
//                allPurposeCleaner, // 32oz bottle (2-month supply)
//                microfiberCloths,  // Reusable (lasts 2+ months)
//                dishSoap,          // 24oz bottle (2-month supply)
//                scrubBrush         // Durable (lasts 2+ months)
//        );
//        createSpecialPackage("Home Cleaning Starter Kit", 60, cleaningKit); // 60 days = 2 months
//
//// ================= PACKAGE 3: Luxury Bath Set (1-Month Indulgence) =================
//        List<Product> bathBundle = Arrays.asList(
//                bodyWash,   // 16oz bottle (1-month supply)
//                loofah,     // Replace monthly
//                bodyLotion, // 16oz bottle (1-month supply)
//                bathSalts   // 4lbs (1-month supply)
//        );
//        createSpecialPackage("Luxury Bath & Body Set", 30, bathBundle); // 30 days = 1 month
//
//// ================= PACKAGE 4: Eco-Friendly Bundle (6-Month Sustainable Use) =================
//        List<Product> ecoBundle = Arrays.asList(
//                bambooToothbrush, // Replace every 3 months (2 brushes in pack)
//                refillSoap,       // 64oz concentrate (6-month supply)
//                reusableBags      // Long-term use
//        );
//        createSpecialPackage("Eco-Friendly Home Bundle", 180, ecoBundle); // 180 days = 6 months
//
//// ================= PACKAGE 5: Travel Hygiene Kit (2-Week Trip) =================
//        List<Product> travelKit = Arrays.asList(
//                travelToothpaste, // 1oz (2-week supply)
//                miniDeodorant,    // 1.5oz (2-week supply)
//                wetWipes,         // 10-count (2-week supply)
//                toothbrush        // Standard (replace post-trip)
//        );
//        createSpecialPackage("Travel Hygiene Kit", 14, travelKit); // 14 days = 2 weeks
//    }
//}
