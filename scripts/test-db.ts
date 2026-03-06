import { prisma } from "@/lib/prisma";
import { pool } from "@/lib/db";

async function testCRUD() {
  console.log("Testowanie Prisma CRUD operations...\n");

  //Czyszcenie starych testów

  await prisma.user.deleteMany({
    where: { email: "test@example.com" },
  });
  console.log("0 - Wyczyszczono stare dane testowe");

  try {
    // CREATE - Tworzenie nowego użytkownika

    console.log("1 CREATE - Tworzenie testowego usera...");

    const newUser = await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "Test User",
        emailVerified: false,
        // Opcjonalnie możesz od razu stworzyć powiązane dane:
        preferences: {
          create: {
            theme: "dark",
            githubUsername: "testuser",
            emailNews: true,
          },
        },
      },
      // Include - dołącz powiązane dane w response
      include: {
        preferences: true,
      },
    });

    console.log("User utworzony:", {
      id: newUser.id,
      email: newUser.email,
      preferences: newUser.preferences,
    });
    console.log("");

    // READ - Odczytywanie danych

    console.log("2 READ - Pobieranie userów...");

    // Znajdź wszystkich userów
    const allUsers = await prisma.user.findMany({
      take: 5, // Limit do 5 rekordów
      select: {
        // Select = wybierz tylko te pola
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    console.log(`Znaleziono ${allUsers.length} userów:`, allUsers);
    console.log("");

    // Znajdź jednego usera po email
    const foundUser = await prisma.user.findUnique({
      where: {
        email: "test@example.com",
      },
      include: {
        preferences: true,
        _count: {
          // Policz powiązane rekordy
          select: {
            sessions: true,
            savedRepos: true,
            techNotes: true,
          },
        },
      },
    });

    console.log(" User po email:", foundUser);
    console.log("");

    // UPDATE - Aktualizacja danych

    console.log("3 UPDATE - Aktualizacja usera...");

    const updatedUser = await prisma.user.update({
      where: {
        id: newUser.id,
      },
      data: {
        name: "Updated Test User",
        emailVerified: true,
        // Możesz też aktualizować nested relations:
        preferences: {
          update: {
            theme: "light",
          },
        },
      },
    });

    console.log("User zaktualizowany:", {
      id: updatedUser.id,
      name: updatedUser.name,
      emailVerified: updatedUser.emailVerified,
    });
    console.log("");

    // COMPLEX QUERIES - Złożone zapytania

    console.log("4️ COMPLEX QUERIES - Złożone zapytania...");

    // Filtrowanie + sortowanie
    const verifiedUsers = await prisma.user.findMany({
      where: {
        emailVerified: true,
        email: {
          contains: "@example.com", // Zawiera string
        },
      },
      orderBy: {
        createdAt: "desc", // Sortowanie malejąco
      },
      take: 10,
    });

    console.log(`Zweryfikowani userzy: ${verifiedUsers.length}`);
    console.log("");

    // Aggregation (zliczanie, sumowanie)
    const stats = await prisma.user.aggregate({
      _count: {
        id: true,
      },
      where: {
        emailVerified: true,
      },
    });

    console.log("Statystyki:", {
      totalVerifiedUsers: stats._count.id,
    });
    console.log("");

    // RELATIONS - Testowanie relacji

    console.log("5️ RELATIONS - Tworzenie powiązanych danych...");

    // Dodaj notatkę do usera
    const noteWithUser = await prisma.techNote.create({
      data: {
        title: "Prisma CRUD Tutorial",
        content: "# Jak używać Prisma Client\n\nPrisma to świetne ORM!",
        category: "tutorial",
        tags: ["prisma", "typescript", "database"],
        userId: newUser.id, // Powiązanie z userem
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    console.log("Notatka utworzona:", {
      id: noteWithUser.id,
      title: noteWithUser.title,
      user: noteWithUser.user,
    });
    console.log("");

    // Pobierz usera z wszystkimi notatkami
    const userWithNotes = await prisma.user.findUnique({
      where: {
        id: newUser.id,
      },
      include: {
        techNotes: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    console.log("User z notatkami:", {
      email: userWithNotes?.email,
      notesCount: userWithNotes?.techNotes.length,
      notes: userWithNotes?.techNotes,
    });
    console.log("");

    console.log("6️ DELETE - Usuwanie testowych danych...");

    // Usuń notatki (muszą być usunięte przed userem przez relację)
    const deletedNotes = await prisma.techNote.deleteMany({
      where: {
        userId: newUser.id,
      },
    });

    console.log(`Usunięto ${deletedNotes.count} notatek`);

    // Usuń usera (onDelete: Cascade usunie też preferences)
    const deletedUser = await prisma.user.delete({
      where: {
        id: newUser.id,
      },
    });

    console.log("User usunięty:", deletedUser.email);
    console.log("");

    console.log("7️⃣ TRANSACTIONS - Transakcje...");

    /**
     * TRANSAKCJA = kilka operacji, które muszą się udać RAZEM
     * Jeśli jedna się nie uda, wszystkie są cofnięte (rollback)
     */

    const transaction = await prisma.$transaction(async (tx) => {
      // Utwórz usera
      const user = await tx.user.create({
        data: {
          email: "transaction-test@example.com",
          name: "Transaction Test",
        },
      });

      // Utwórz preferencje
      const prefs = await tx.userPreferences.create({
        data: {
          userId: user.id,
          theme: "system",
        },
      });

      // Utwórz notatkę
      const note = await tx.techNote.create({
        data: {
          userId: user.id,
          title: "Test Note",
          content: "Test content",
          tags: [],
        },
      });

      // Jeśli któraś operacja się nie uda, wszystkie zostaną cofnięte!
      return { user, prefs, note };
    });

    console.log("Transakcja zakończona:", {
      userId: transaction.user.id,
      prefsId: transaction.prefs.id,
      noteId: transaction.note.id,
    });
    console.log("");

    // Cleanup - usuń dane z transakcji
    await prisma.user.delete({
      where: { id: transaction.user.id },
    });

    console.log("Cleanup zakończony");
    console.log("");

    console.log("Wszystkie testy CRUD zakończone sukcesem!");

    console.log("CREATE - Tworzenie rekordów");
    console.log("READ - Odczytywanie danych (findMany, findUnique)");
    console.log("UPDATE - Aktualizacja rekordów");
    console.log("DELETE - Usuwanie rekordów");
    console.log("RELATIONS - Powiązania między tabelami");
    console.log("TRANSACTIONS - Atomowe operacje");

    console.log("Prisma działa.");
  } catch (error) {
    console.error(" Błąd podczas testów:", error);
    throw error;
  } finally {
    // Zawsze rozłącz się z bazą na końcu
    await prisma.$disconnect();
    await pool.end();
  }
}

// Uruchom testy
testCRUD()
  .then(() => {
    console.log("\nScript zakończony");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n Script failed:", error);
    process.exit(1);
  });
