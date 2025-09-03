document.addEventListener('DOMContentLoaded', () => {
    const arabicTextElem = document.getElementById('arabicText');
    const reciteCountElem = document.getElementById('reciteCount');
    const counterElem = document.getElementById('counter');
    const resetBtn = document.getElementById('resetBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const hadithDetailsElem = document.getElementById('hadithDetails');
    const hadithContentElem = document.getElementById('hadithContent');
    const increaseFontBtn = document.getElementById('increaseFont');
    const decreaseFontBtn = document.getElementById('decreaseFont');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentCount = 0;
    let currentAzkaarIndex = 0;
    // Initial font size from CSS, adjust based on your preference.
    // We'll calculate this dynamically for better responsiveness.
    let currentArabicFontSize = parseFloat(getComputedStyle(arabicTextElem).fontSize) / parseFloat(getComputedStyle(arabicTextElem).parentRule ? getComputedStyle(arabicTextElem).parentRule.style.fontSize : getComputedStyle(document.body).fontSize);
    if (isNaN(currentArabicFontSize) || currentArabicFontSize === 0) {
        currentArabicFontSize = 2.5; // Fallback if calculation fails
    }

    const fontSizeStep = 0.2;

    const azkaarList = [
        {
            arabic: "اللهُ أَكْبَرُ  ",
            reciteTimes: 1,
            hadith: "Syedna Abdullah bin Abbas narrates: I used to recognize the completion of the obligatory prayer of the Messenger of Allah by the loud sound of Takbir."
        },
        {
            arabic: "أسْتَغْفِرُ اللَّهَ ",
            reciteTimes: 3,
            hadith: "Syedna Thawban narrates: When the Messenger of Allah had finished his prayer, he would recite these words: (3 times) I ask Allah for forgiveness. Immediately after that: O Allah! You are As-Salam (the One Who is free from all defects and deficiencies) and from You is all peace, blessed are You, Possessor of majesty and honor."
        },
        {
            arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَاذَا الْجَلَالِ وَالْإِكْرَامِ ",
            reciteTimes: 1,
            hadith: "Syedna Thawban narrates: When the Messenger of Allah had finished his prayer, he would recite these words: (3 times) I ask Allah for forgiveness. Immediately after that: O Allah! You are As-Salam (the One Who is free from all defects and deficiencies) and from You is all peace, blessed are You, Possessor of majesty and honor."
        },
        {
            arabic: "ٱللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ٱلْحَيُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشۡفَعُ عِندَهُۥٓ إِلَّا بِإِذۡنِهِۦ ۚ يَعۡلَمُ مَا بَيۡنَ أَيۡدِيهِمۡ وَمَا خَلۡفَهُمۡ ۖ وَلَا يُحِيطُونَ بِشَيۡءٖ مِّنۡ عِلۡمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرۡسِىُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفۡظُهُمَا ۚ وَهُوَ ٱلۡعَلِىُّ ٱلۡعَظِيمُ ",
            reciteTimes: 1, // Example, can be higher if desired
            hadith: "Syedna Abu Umamah narrates: The Messenger of Allah said: Whoever recites Ayat al Kursi (Surah Al-Baqarah: Verse 255) after every prayer, he will for sure enter paradise immediately after his death."
        },
        {
            arabic: "رَبِّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ ",
            reciteTimes: 1,
            hadith: "Syedna Bara bin Azib narrates: We would stand on the right side behind the Messenger of Allah in the prayer so that his face would turn towards us after Salam. Then I heard him say رَبِّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ after Salam. (1 time). 'O Lord! Save me from Your punishment on the Day when You resurrect or gather Your slaves.'"
        },{
            arabic: "رَبِّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ ",
            reciteTimes: 1,
            hadith: "Syedna Muadh bin Jabal narrates: the Messenger of Allah advised to me: O Muadh! Never leave saying these words after every prayer. (1 time) “O Allah! Help me in remembering You, thanking You, and perfecting my worship of You.”"
        },{
            arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ ",
            reciteTimes: 1,
            hadith: "Syedna Anas narrates the Messenger of Allah would frequently pray this dua.'O my Allah Give us good in this world and good in the Hereafter and save us from the torment of the Fire.'"
        },{
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَأَعُوذُ بِكَ مِنَ الْبُخْلِ وَأَعُوذُ بِكَ مِنْ أَنْ أُرَدَّ إِلَى أَرْذَلِ الْعُمُرِ وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ ",
            reciteTimes: 1,
            hadith: "Syedna Saad bin Abi Waqqas narrates: the Messenger of Allah used to seek refuge with Allah through these words at the end of every prayer. “O Allah! I seek refuge with You from cowardice, and I seek refuge with You from miserliness, and I seek refuge with You from being brought back to senile old age, and I seek refuge with You from the Fitnah (trials or afflictions) of the world, and I seek refuge with You from the punishments in the grave.”"
        },{
            arabic: "اللَّهُمَّ اغْفِرْ لِي مَا قَدَّمْتُ وَمَا أَخَّرْتُ وَمَا أَسْرَرْتُ وَمَا أَعْلَنْتُ وَمَا أَسْرَفْتُ  وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي أَنْتَ الْمُقَدِّمُ وَأَنْتَ الْمُؤَخِّرُ لَا إِلَهَ إِلَّا أَنْتَ ",
            reciteTimes: 1,
            hadith: "Syedna Ali bin Abi Talib narrates When the Messenger of Allah would say Salam of the prayer, he would pray to Allah with these words.“O Allah! Forgive me my past and future sins, what I have done in secret and what I have done openly, what I have transgressed and what you know more than I. You are the One who brings forward (in good deeds) and the One Who puts back, there is none worthy of worship but You.”"
        },{
            arabic: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ",
            reciteTimes: 3,
            hadith: "Syedna Mugheerah bin Shuba narrates: When the Messenger of Allah would say Salam of the prayer, he would recite these words three times: (3 times) See the translation in the next supplication.“There is none worthy of worship but Allah alone, with no partner or associate. To Him belongs the dominion, and to Him be praise, and He is over all things competent.”"
        },{
            arabic: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ ، لَا إِلَهَ إِلَّا اللَّهُ وَلَا نَعْبُدُ إِلَّا إِيَّاهُ ، لَهُ النَّعْمَةُ وَلَهُ الْفَضْلُ وَلَهُ الثَّنَاءُ الْحَسَنُ ، لَا إِلَهَ إِلَّا اللهُ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِةَ الْكَافِرُونَ ",
            reciteTimes: 1,
            hadith: "Syedna Abdullah bin Zubair narrates: When the Messenger of Allah would say the Salam of the prayer, he would recite these words loudly. “There is none worthy of worship but Allah alone, with no partner or associate. He is the Dominion, to Him be praise, and He is able to do all things. There is no power (of avoiding the sin) and no strength (to do good deeds) except with Allah. There is none worthy of worship but Allah and we worship none but Him. To Him belong all grace and favor, and to Him be glorious praise. There is none worthy of worship but Allah and we are sincere in faith and devotion to Him even though the disbelievers may detest (this obedience).”"
        },{
            arabic: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَ هُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا يَنْفَعُ ذَا الْجَدِ مِنْكَ الْجَدُّ َ ",
            reciteTimes: 1,
            hadith: "Syedna Mugheerah bin Shuba narrates: When the Messenger of Allah would say the Salam of the prayer, he would recite these words. “There is none worthy of worship but Allah alone, with no partner or associate. He is the Dominion, to Him be praise, and He is able to do all things. O Allah! None can withhold what You give, and none can give what You withhold, and the good fortune of any fortunate person is of no avail against You.”"
        },{
            arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَّا إِلَهَ إِلَّا أَنْتَ اسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ ",
            reciteTimes: 1,
            hadith: "Syedah Aishah narrates: When the Messenger of Allah would participate in a gathering or perform the prayer, he would recite these words at the end. “Glory is to You, O Allah, and praise, I bear witness that there is none worthy of worship except You, I seek Your forgiveness and I repent to You.”"
        },{
            arabic: "قُلْ هُوَ اللهُ أَحَدٌ ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ..... قُلْ أَعُوذُ بِرَبِّ النَّاسِ ",
            reciteTimes: 1,
            hadith: "Syedna Uqbah bin Amir narrates: the Messenger of Allah ordered me to recite Muawwidhat (i.e., the 3 Surahs giving the refuge of Allah against Shaitan, Jinn and magic etc.) at the end of every prayer. (The three Surahs 1 time)"
        },{
            arabic: "سُبْحَانَ اللهِ -- الْحَمْدُ لِلَّهِ -- اللهُ أَكْبَرُ  -- لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
            reciteTimes: 33,
            hadith: "Syedna Abu Hurairah narrates: the Messenger of Allah said that the one who says these words after every prayer never becomes disappointed, and all of his sins are forgiven, even if his sins are like the foam of the sea. (All the three, 33 times) “Glory be to Allah, and praise be to Allah, and Allah is the Greatest.” (And in order to complete the number of 100, 1 time) “There is none worthy of worship but Allah alone, with no partner or associate. To Him belongs the dominion, and to Him be praise, and He is over all things competent.”"
        },{
            arabic: " لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ بِيَدِهِ الْخَيْرُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ",
            reciteTimes: 10,
            hadith: "Syedna Abdur Rahman bin Ghanam narrates: the Messenger of Allah said: Whoever says these words at the end of Maghrib prayer and Fajr prayer while his feet are still folded, before speaking, he gets the reward of freeing 10 slaves and he shall be in protection from every dangerous thing and Shaitan all the day and night (10 times). “There is none worthy of worship but Allah alone, with no partner or associate. To Him belongs the dominion, and to Him be praise. In His hand is all good. He gives life and causes death, and He is over all things competent.”"
        },{
            arabic: " اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ ",
            reciteTimes: 7,
            hadith: "Syedna Abu Harith narrates: the Messenger of Allah said: Whoever says these words at the end of Maghrib prayer before speaking and if he dies that night, he will be free from the fire of Hell. If he recites these words at the end of Fajr prayer and dies that day, he will be free from the Hell. (7 times) “O Allah! Save me from Fire.”"
        },{
            arabic: " اللَّهُمَّ إِنِّي اَسْئَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلاً مُتَقَبَّلاً ",
            reciteTimes: 1,
            hadith: "Syedah Umm Salamah narrates: When the Messenger of Allah would say the Salam of the Fajr prayer, he would pray with these words (1 time). “O Allah! I ask You for beneficial knowledge and goodly provision and acceptable deeds.”"
        },{
            arabic: "سُبْحَانَ الْمَلِكِ الْقُدُّوسِ ",
            reciteTimes: 3,
            hadith: "Syedna Abdur Rahman bin Abza narrates: When the Messenger of Allah would say the Salam of Witr prayer, he would say these words (3 times).“Glory be to the Sovereign, the Most Holy.”"
        },{
            arabic: " رَبُّ الْمَلَائِكَةِ وَالرُّوحِ ",
            reciteTimes: 1,
            hadith: "He would lengthen and raise the voice the third time. And then he would say 1 time: “Lord of the angels and the Jibril.”"
        }
        // Add more Azkaar as needed
    ];

    function updateAzkaarDisplay() {
        const currentAzkaar = azkaarList[currentAzkaarIndex];
        arabicTextElem.textContent = currentAzkaar.arabic;
        reciteCountElem.textContent = currentAzkaar.reciteTimes;
        hadithContentElem.textContent = currentAzkaar.hadith;

        // Reset counter when a new Azkaar is displayed
        currentCount = 0;
        counterElem.textContent = currentCount;

        hadithDetailsElem.classList.add('hidden'); // Hide details when azkaar changes
        learnMoreBtn.textContent = "Learn More"; // Reset button text
        // When azkaar changes, we want to reset the font size to its responsive default
        // based on CSS, not just the initial `initialFontSize` value from script start.
        // This ensures proper behavior if user changed font size then navigated.
        resetArabicFontSize();
    }

    function applyFontSize(size) {
        arabicTextElem.style.fontSize = `${size}em`;
    }

    function resetArabicFontSize() {
        // Remove inline style to let CSS media queries take over
        arabicTextElem.style.fontSize = '';
        // Then get the computed style to update our JS variable for subsequent adjustments
        currentArabicFontSize = parseFloat(getComputedStyle(arabicTextElem).fontSize) / parseFloat(getComputedStyle(document.body).fontSize);
    }

    // Initial load
    updateAzkaarDisplay();

    // Counter functionality
    counterElem.addEventListener('click', () => {
        currentCount++;
        counterElem.textContent = currentCount;
    });

    resetBtn.addEventListener('click', () => {
        currentCount = 0;
        counterElem.textContent = currentCount;
    });

    // Learn More functionality
    learnMoreBtn.addEventListener('click', () => {
        hadithDetailsElem.classList.toggle('hidden');
        if (hadithDetailsElem.classList.contains('hidden')) {
            learnMoreBtn.textContent = "Learn More";
        } else {
            learnMoreBtn.textContent = "Hide Details";
        }
    });

    // Font Size controls
    increaseFontBtn.addEventListener('click', () => {
        currentArabicFontSize += fontSizeStep;
        applyFontSize(currentArabicFontSize);
    });

    decreaseFontBtn.addEventListener('click', () => {
        // Set a minimum readable font size
        if (currentArabicFontSize > 1.2) {
            currentArabicFontSize -= fontSizeStep;
            applyFontSize(currentArabicFontSize);
        }
    });

    // Navigation buttons
    nextBtn.addEventListener('click', () => {
        currentAzkaarIndex = (currentAzkaarIndex + 1) % azkaarList.length;
        updateAzkaarDisplay(); // This will now also reset the counter and font size
    });

    prevBtn.addEventListener('click', () => {
        currentAzkaarIndex = (currentAzkaarIndex - 1 + azkaarList.length) % azkaarList.length;
        updateAzkaarDisplay(); // This will now also reset the counter and font size
    });

    // Handle window resize to re-evaluate base font size for Arabic text
    window.addEventListener('resize', () => {
        // Reset the font size when window resizes to apply correct media query font size
        // before any user adjustments. This makes it truly responsive.
        resetArabicFontSize();
        // The currentArabicFontSize will then be correctly set by updateAzkaarDisplay if called,
        // or by the next font size adjustment.
        // For existing display, we re-apply just in case:
        applyFontSize(currentArabicFontSize);
    });
});