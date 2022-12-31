#[cfg(test)]
mod tests {
    use readability::extractor;

    #[test]
    fn test_extract_content() {
        let product = extractor::scrape("http://paulgraham.com/weird.html").unwrap();
        assert_eq!(product.title, "Weird Languages");
        assert_eq!(product.content, "August 2021<br><br><p>When people say that in their experience all programming languages\nare basically equivalent, they're making a statement not about\nlanguages but about the kind of programming they've done.</p><br><br><p>99.5% of programming consists of gluing together calls to library\nfunctions. All popular languages are equally good at this. So one\ncan easily spend one's whole career operating in the intersection\nof popular programming languages.</p><br><br><p>But the other .5% of programming is disproportionately interesting.\nIf you want to learn what it consists of, the weirdness of weird\nlanguages is a good clue to follow.</p><br><br><p>Weird languages aren't weird by accident. Not the good ones, at\nleast. The weirdness of the good ones usually implies the existence\nof some form of programming that's not just the usual gluing together\nof library calls.</p><br><br><p>A concrete example: Lisp macros. Lisp macros seem weird even to\nmany Lisp programmers. They're not only not in the intersection of\npopular languages, but by their nature would be hard to implement\nproperly in a language without turning it into a dialect of\nLisp. And macros are definitely evidence of techniques that go\nbeyond glue programming. For example, solving problems by first\nwriting a language for problems of that type, and then writing\nyour specific application in it. Nor is this all you can do with\nmacros; it's just one region in a space of program-manipulating\ntechniques that even now is far from fully explored.</p><br><br><p>So if you want to expand your concept of what programming can be,\none way to do it is by learning weird languages. Pick a language\nthat most programmers consider weird but whose median user is smart,\nand then focus on the differences between this language and the\nintersection of popular languages. What can you say in this language\nthat would be impossibly inconvenient to say in others? In the\nprocess of learning how to say things you couldn't previously say,\nyou'll probably be learning how to think things you couldn't\npreviously think.</p><br><br><br><br><br><br><br><br><font color=\"888888\"><b>Thanks</b> to Trevor Blackwell, Patrick Collison, Daniel Gackle, Amjad\nMasad, and Robert Morris for reading drafts of this.\n</font><br><br>");
        assert_eq!(product.text, "August 2021When people say that in their experience all programming languages\nare basically equivalent, they're making a statement not about\nlanguages but about the kind of programming they've done.99.5% of programming consists of gluing together calls to library\nfunctions. All popular languages are equally good at this. So one\ncan easily spend one's whole career operating in the intersection\nof popular programming languages.But the other .5% of programming is disproportionately interesting.\nIf you want to learn what it consists of, the weirdness of weird\nlanguages is a good clue to follow.Weird languages aren't weird by accident. Not the good ones, at\nleast. The weirdness of the good ones usually implies the existence\nof some form of programming that's not just the usual gluing together\nof library calls.A concrete example: Lisp macros. Lisp macros seem weird even to\nmany Lisp programmers. They're not only not in the intersection of\npopular languages, but by their nature would be hard to implement\nproperly in a language without turning it into a dialect of\nLisp. And macros are definitely evidence of techniques that go\nbeyond glue programming. For example, solving problems by first\nwriting a language for problems of that type, and then writing\nyour specific application in it. Nor is this all you can do with\nmacros; it's just one region in a space of program-manipulating\ntechniques that even now is far from fully explored.So if you want to expand your concept of what programming can be,\none way to do it is by learning weird languages. Pick a language\nthat most programmers consider weird but whose median user is smart,\nand then focus on the differences between this language and the\nintersection of popular languages. What can you say in this language\nthat would be impossibly inconvenient to say in others? In the\nprocess of learning how to say things you couldn't previously say,\nyou'll probably be learning how to think things you couldn't\npreviously think.Thanksto Trevor Blackwell, Patrick Collison, Daniel Gackle, Amjad\nMasad, and Robert Morris for reading drafts of this.");
    }
}
