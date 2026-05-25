const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const content = `**N+1 problem și query optimization** în Spring Data JPA — cea mai comună problemă de performanță și cum să o rezolvi cu fetch strategies corecte.

**Problema N+1 — exemplul clasic**

\`\`\`java
@Entity
public class User {
    @Id Long id;
    String name;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY) // default lazy
    private List<Order> orders;
}

// N plus 1 problem
List<User> users = userRepo.findAll();           // 1 query: SELECT * FROM users
for (User user : users) {
    System.out.println(user.getOrders().size()); // N queries: SELECT * FROM orders WHERE user_id=?
}
// Total: 1 + N queries pentru N useri = catastrofa la 1000 useri
\`\`\`

**Soluția 1: JOIN FETCH (JPQL)**

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN FETCH u.orders")
    List<User> findAllWithOrders();

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.orders WHERE u.active = true")
    List<User> findActiveWithOrders();
}
// Generează O SINGURĂ query cu LEFT JOIN
\`\`\`

**Soluția 2: @EntityGraph**

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = {"orders", "roles"})
    List<User> findAll();

    @EntityGraph(attributePaths = {"orders.items"}) // nested fetch
    @Query("SELECT u FROM User u WHERE u.id IN :ids")
    List<User> findByIds(@Param("ids") List<Long> ids);
}

// Named graph
@Entity
@NamedEntityGraph(
    name = "User.withOrdersAndItems",
    attributeNodes = {
        @NamedAttributeNode(value = "orders", subgraph = "orders.items")
    },
    subgraphs = {
        @NamedSubgraph(name = "orders.items", attributeNodes = @NamedAttributeNode("items"))
    }
)
public class User { ... }
\`\`\`

**Soluția 3: BatchSize sau @BatchSize**

\`\`\`java
// application.yml
// spring:
//   jpa:
//     properties:
//       hibernate.default_batch_fetch_size: 20

// Sau pe entitate
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
@BatchSize(size = 20)
private List<Order> orders;

// Acum: 1 query pentru useri + (N/20) batch queries cu IN clause
// Pentru 1000 useri: 1 + 50 queries (mult mai bine decât 1001)
\`\`\`

**Projections — fetch DOAR ce-i necesar**

\`\`\`java
// DTO projection cu constructor
public interface UserSummary {
    Long getId();
    String getName();
    Integer getOrderCount();
}

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("""
        SELECT u.id as id, u.name as name, COUNT(o) as orderCount
        FROM User u LEFT JOIN u.orders o
        GROUP BY u.id, u.name
        """)
    List<UserSummary> findAllSummaries();
}

// Beneficii: NU încarci entitățile complete, doar câmpurile cerute
// Hibernate generează SELECT id, name, ... fără orders, profile etc.
\`\`\`

**Identificarea N plus 1 în log-uri**

\`\`\`yaml
# application.yml — vezi query-urile generate
spring:
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        generate_statistics: true
logging:
  level:
    org.hibernate.SQL: DEBUG
    org.hibernate.stat: DEBUG  # statistici per request
\`\`\`

**Alte optimizări JPA**

\`\`\`java
// 1. Pagination la JOIN FETCH — folosește subquery sau două queries
// JOIN FETCH + pagination în JPA = problemă; HQL_TUPLE_FETCH

// 2. Native query pentru raport-uri complexe
@Query(value = """
    SELECT u.name, COUNT(o.id) as orders, SUM(o.total) as revenue
    FROM users u LEFT JOIN orders o ON o.user_id = u.id
    WHERE u.created_at >= :since
    GROUP BY u.name
    HAVING COUNT(o.id) > 5
    ORDER BY revenue DESC
    """, nativeQuery = true)
List<Object[]> topUsers(@Param("since") LocalDate since);

// 3. ReadOnly tx pentru queries
@Transactional(readOnly = true)
public List<User> findReports() { ... } // Hibernate skip dirty checking

// 4. @QueryHints pentru cache
@QueryHints({@QueryHint(name = "org.hibernate.cacheable", value = "true")})
List<Country> findAll();
\`\`\`

• **Default LAZY** pentru @OneToMany și @ManyToMany — controlezi tu când să încarce
• **JOIN FETCH** când știi că ai nevoie de relație; **@EntityGraph** pentru cazuri reutilizabile
• **DTO projections** pentru query-uri read-only complexe — evită over-fetching`;

(async () => {
  const lessons = await p.lesson.findMany({ where: { module: { slug: 'java' }, title: { contains: 'Spring Data JPA' } } });
  const theory = await p.theory.findFirst({ where: { lessonId: { in: lessons.map(l => l.id) }, title: { contains: 'query optimization' } } });
  if (!theory) { console.log('NOT FOUND'); await p.$disconnect(); return; }
  await p.theory.update({ where: { id: theory.id }, data: { content } });
  console.log(`✓ ${theory.title}: ${theory.content.length} → ${content.length}`);
  await p.$disconnect();
})();
