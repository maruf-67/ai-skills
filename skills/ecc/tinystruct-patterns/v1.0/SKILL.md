---
name: tinystruct-patterns
description: "Expert guidance for developing with the tinystruct Java framework. Use when working on the tinystruct codebase or any project built on tinystruct — including creating Application classes, @Action-mapped routes, unit tests, ActionRegistry, HTTP/CLI dual-mode handling, the built-in HTTP server, the event system, JSON with Builder/Builders, database persistence with AbstractData, POJO generation, Server-Sent Events (SSE), file uploads, and outbound HTTP networking."
type: Skill
title: tinystruct-patterns
resource: file:///home/almaruf67/Codes/ai-os/ECC/skills/tinystruct-patterns/SKILL.md
tags:
- ecc
- general
timestamp: '2026-08-03T21:09:42Z'
---

# tinystruct Development Patterns

Architecture and implementation patterns for building modules with the **tinystruct** Java framework – a lightweight, high-performance framework that treats CLI and HTTP as equal citizens, requiring no `main()` method and minimal configuration.

## Core Principle

**CLI and HTTP are equal citizens.** Every method annotated with `@Action` should ideally be runnable from both a terminal and a web browser without modification. This "dual-mode" capability is the core design philosophy of tinystruct.

## When to Activate

### When to Use

- Creating new `Application` modules by extending `AbstractApplication`.
- Defining routes and command-line actions using `@Action`.
- Handling per-request state via `Context`.
- Performing JSON serialization using the native `Builder` and `Builders` components.
- Working with database persistence via `AbstractData` POJOs.
- Generating POJOs from database tables using the `generate` command.
- Implementing Server-Sent Events (SSE) for real-time push.
- Handling file uploads via multipart data.
- Making outbound HTTP requests with `URLRequest` and `HTTPHandler`.
- Configuring database connections or system settings in `application.properties`.
- Debugging routing conflicts (Actions) or CLI argument parsing.

## How It Works

The tinystruct framework treats any method annotated with `@Action` as a routable endpoint for both terminal and web environments. Applications are created by extending `AbstractApplication`, which provides core lifecycle hooks like `init()` and access to the request `Context`.

Routing is handled by the `ActionRegistry`, which automatically maps path segments to method arguments and injects dependencies. For data-only services, the native `Builder` and `Builders` components should be used for JSON serialization to maintain a zero-dependency footprint. The database layer uses `AbstractData` POJOs paired with XML mapping files for CRUD operations without external ORM libraries.

## Examples

### Basic Application (MyService)
```java
public class MyService extends AbstractApplication {
    @Override
    public void init() {
        this.setTemplateRequired(false); // Disable .view lookup for data/API apps
    }

    @Override public String version() { return "1.0.0"; }

    @Action("greet")
    public String greet() {
        return "Hello from tinystruct!";
    }

    // Path parameter: GET /?q=greet/James  OR  bin/dispatcher greet/James
    @Action("greet")
    public String greet(String name) {
        return "Hello, " + name + "!";
    }
}
```

### HTTP Mode Disambiguation (login)
```java
@Action(value = "login", mode = Mode.HTTP_POST)
public String doLogin(Request<?, ?> request) throws ApplicationException {
    request.getSession().setAttribute("userId", "42");
    return "Logged in";
}
```

### Native JSON Data Handling (Builder + Builders)
```java
import org.tinystruct.data.component.Builder;
import org.tinystruct.data.component.Builders;

@Action("api/data")
public String getData() throws ApplicationException {
    Builders dataList = new Builders();
    Builder item = new Builder();
    item.put("id", 1);
    item.put("name", "James");
    dataList.add(item);

    Builder response = new Builder();
    response.put("status", "success");
    response.put("data", dataList);
    return response.toString(); // {"status":"success","data":[{"id":1,"name":"James"}]}
}
```

### SSE (Server-Sent Events)
```java
import org.tinystruct.http.SSEPushManager;

@Action("sse/connect")
public String connect() {
    return "{\"type\":\"connect\",\"message\":\"Connected to SSE\"}";
}

// Push to a specific client
String sessionId = getContext().getId();
Builder msg = new Builder();
msg.put("text", "Hello, user!");
SSEPushManager.getInstance().push(sessionId, msg);

// Broadcast to all
// Broadcast to all
SSEPushManager.getInstance().broadcast(msg);
```

### File Upload
```java
import org.tinystruct.data.FileEntity;

@Action(value = "upload", mode = Mode.HTTP_POST)
public String upload(Request<?, ?> request) throws ApplicationException {
    List<FileEntity> files = request.getAttachments();
    if (files != null) {
        for (FileEntity file : files) {
            System.out.println("Uploaded: " + file.getFilename());
        }
    }
    return "Upload OK";
}
```

## MCP Server and Tools Integration

tinystruct provides native support for the Model Context Protocol (MCP) starting with SDK version **`1.7.26`**.
The MCP APIs (e.g., `org.tinystruct.mcp.MCPTool`, `org.tinystruct.mcp.MCPServer`, `org.tinystruct.mcp.MCPException`) are included directly in the core dependency:
```xml
<dependency>
    <groupId>org.tinystruct</groupId>
    <artifactId>tinystruct</artifactId>
    <version>1.7.26</version>
</dependency>
```

> **SECURITY WARNING (Prompt Injection):**
> Tool return values are fed directly back into the AI model's context window. You **MUST** validate and sanitize all caller-supplied arguments before including them in the tool's return string. Failure to sanitize inputs can allow an attacker to inject adversarial instructions (Prompt Injection) that override the model's behavior. Always validate length, character sets, and nullity.

**To create an MCP Tool:**
1. Extend `org.tinystruct.mcp.MCPTool`.
2. Annotate operations with `@Action` and declare parameters using `@Argument` within the `arguments` array.
3. Accept parameters as explicit method arguments matching the keys in `@Argument`. (Do **not** use `getContext().getAttribute(...)` for tool arguments).

```java
import org.tinystruct.mcp.MCPTool;
import org.tinystruct.mcp.MCPException;
import org.tinystruct.system.annotation.Action;
import org.tinystruct.system.annotation.Argument;

public class MyCustomTool extends MCPTool {
    public MyCustomTool() {
        super("custom", "A custom tool for demonstrating MCP");
    }

    @Action(
        value = "custom/hello",
        description = "Say hello to someone",
        arguments = {
            @Argument(key = "name", description = "The name to greet", type = "string", optional = false)
        }
    )
    public String hello(String name) throws MCPException {
        // SECURITY: Validate/sanitize tool inputs before returning to the model
        // to prevent prompt injection vulnerabilities.
        if (name == null || name.length() > 50 || !name.matches("^[a-zA-Z0-9 ]+$")) {
            throw new MCPException("Invalid name provided");
        }
        return "Hello, " + name + "!";
    }
}
```

**To deploy an MCP Server:**
1. Extend `org.tinystruct.mcp.MCPServer`.
2. Override `init()` and register your tools using `this.registerTool()`. The framework automatically scans and maps the `@Action` methods.

```java
import org.tinystruct.mcp.MCPServer;

public class MyMCPServer extends MCPServer {
    @Override
    public void init() {
        super.init();
        this.registerTool(new MyCustomTool());
    }

    @Override
    public String version() {
        return "1.0.0";
    }
}
```

Run the server via the dispatcher:
```bash
bin/dispatcher start --import org.tinystruct.system.HttpServer --import com.example.MyMCPServer
```

## Configuration

Settings are managed in `src/main/resources/application.properties`.

```properties
# Database
driver=org.h2.Driver
database.url=jdbc:h2:~/mydb
database.user=sa
database.password=

# Server
default.home.page=hello
server.port=8080

# Locale
default.language=en_US

# Session (Redis for clustered environments)
# default.session.repository=org.tinystruct.http.RedisSessionRepository
# redis.host=127.0.0.1
# redis.port=6379
```

Access config values in your application:
```java
String port = this.getConfiguration("server.port");
```

## Red Flags & Anti-patterns

| Symptom | Correct Pattern |
|---|---|
| Importing `com.google.gson` or `com.fasterxml.jackson` | Use `org.tinystruct.data.component.Builder` / `Builders`. |
| Using `List<Builder>` for JSON arrays | Use `Builders` to avoid generic type erasure issues. |
| `ApplicationRuntimeException: template not found` | Call `setTemplateRequired(false)` in `init()` for API-only apps. |
| Annotating `private` methods with `@Action` | Actions must be `public` to be registered by the framework. |
| Hardcoding `main(String[] args)` in apps | Use `bin/dispatcher` as the entry point for all modules. |
| Manual `ActionRegistry` registration | Prefer the `@Action` annotation for automatic discovery. |
| Action not found at runtime | Ensure class is imported via `--import` or listed in `application.properties`. |
| CLI arg not visible | Pass with `--key value`; access via `getContext().getAttribute("--key")`. |
| Two methods same path, wrong one fires | Set explicit `mode` (e.g., `HTTP_GET` vs `HTTP_POST`) to disambiguate. |

## Best Practices

1. **Granular Applications**: Break logic into smaller, focused applications rather than one monolithic class.
2. **Setup in `init()`**: Leverage `init()` for setup (config, DB) rather than the constructor. Do NOT call `setAction()` — use `@Action` annotation.
3. **Mode Awareness**: Use the `Mode` parameter in `@Action` to restrict sensitive operations to `CLI` only or specific HTTP methods.
4. **Context over Params**: For optional CLI flags, use `getContext().getAttribute("--flag")` rather than adding parameters to the method signature.
5. **Asynchronous Events**: For heavy tasks triggered by events, use `CompletableFuture.runAsync()` inside the event handler.

## Technical Reference

Detailed guides are available in the `references/` directory:

- [Architecture & Config](references/architecture.md) — Abstractions, Package Map, Properties
- [Routing & @Action](references/routing.md) — Annotation details, Modes, Parameters
- [Data Handling](references/data-handling.md) — Builder, Builders, JSON serialization & parsing
- [Database Persistence](references/database.md) — AbstractData POJOs, CRUD, mapping XML, POJO generation
- [System & Usage](references/system-usage.md) — Context, Sessions, SSE, File Uploads, Events, Networking
- [Testing Patterns](references/testing.md) — JUnit 5 unit and HTTP integration testing

## Reference Source Files (Internal)

- `src/main/java/org/tinystruct/AbstractApplication.java` — Core base class with lifecycle hooks
- `src/main/java/org/tinystruct/system/annotation/Action.java` — Annotation & Modes
- `src/main/java/org/tinystruct/application/ActionRegistry.java` — Routing Engine
- `src/main/java/org/tinystruct/data/component/Builder.java` — JSON object serializer
- `src/main/java/org/tinystruct/data/component/Builders.java` — JSON array serializer
- `src/main/java/org/tinystruct/data/component/AbstractData.java` — Base POJO class with CRUD
- `src/main/java/org/tinystruct/data/Mapping.java` — Mapping XML parser
- `src/main/java/org/tinystruct/data/tools/MySQLGenerator.java` — POJO generator reference
- `src/main/java/org/tinystruct/data/component/FieldType.java` — SQL-to-Java type mappings
- `src/main/java/org/tinystruct/data/component/Condition.java` — Fluent SQL query builder
- `src/main/java/org/tinystruct/http/SSEPushManager.java` — SSE connection management
- `src/test/java/org/tinystruct/application/ActionRegistryTest.java` — Registry test examples
- `src/test/java/org/tinystruct/system/HttpServerHttpModeTest.java` — HTTP integration test patterns

## Reference: architecture

# tinystruct Architecture and Configuration

## When to Use

Choose **tinystruct** when you need a lightweight, high-performance Java framework that treats CLI and HTTP as equal citizens. Ideal for microservices, CLI utilities, and data-driven applications with a small footprint and zero-dependency JSON handling.

## How It Works

### Core Architecture

The framework operates on a singleton `ActionRegistry` that maps URL patterns (or command strings) to `Action` objects. When a request arrives, the system resolves the path and invokes the corresponding method handle.

#### Key Abstractions

| Class/Interface | Role |
|---|---|
| `AbstractApplication` | Base class for all tinystruct applications. Extend this. |
| `@Action` annotation | Maps a method to a URI path (web) or command name (CLI). The single routing primitive. |
| `ActionRegistry` | Singleton that maps URL patterns to `Action` objects via regex. Never instantiate directly. |
| `Action` | Wraps a `MethodHandle` + regex pattern + priority + `Mode` for dispatch. |
| `Context` | Per-request state store. Access via `getContext()`. Holds CLI args and HTTP request/response. |
| `Dispatcher` | CLI entry point (`bin/dispatcher`). Reads `--import` to load applications. |
| `HttpServer` | Built-in HTTP server. Start with `bin/dispatcher start --import org.tinystruct.system.HttpServer`. |

### Package Map

```
org.tinystruct/
├── AbstractApplication.java      ← extend this
├── Application.java              ← interface
├── ApplicationException.java     ← checked exception
├── ApplicationRuntimeException.java ← unchecked exception
├── application/
│   ├── Action.java               ← runtime action wrapper
│   ├── ActionRegistry.java       ← singleton route registry
│   └── Context.java              ← request context
├── system/
│   ├── annotation/Action.java    ← @Action annotation + Mode enum
│   ├── Dispatcher.java           ← CLI dispatcher
│   ├── HttpServer.java           ← built-in HTTP server
│   ├── EventDispatcher.java      ← event bus
│   └── Settings.java             ← reads application.properties
├── data/
│   ├── component/Builder.java    ← JSON object (use instead of Gson/Jackson)
│   ├── component/Builders.java   ← JSON array
│   ├── component/AbstractData.java ← base POJO for DB persistence
│   ├── component/Condition.java  ← fluent SQL query builder
│   ├── component/FieldType.java  ← SQL-to-Java type mappings
│   ├── Mapping.java              ← reads .map.xml metadata
│   ├── DatabaseOperator.java     ← low-level JDBC wrapper
│   └── FileEntity.java           ← file upload representation
├── http/                         ← Request, Response, Constants
│   └── SSEPushManager.java       ← Server-Sent Events management
└── net/                          ← URLRequest, HTTPHandler (outbound HTTP)
```

### Template Behavior and Dispatch Flow

By default, the framework assumes a view template is required. If `templateRequired` is `true`, `toString()` looks for a `.view` file in `src/main/resources/themes/<ClassName>.view`. Use `setVariable("name", value)` to pass data to templates, which use `{%name%}` for interpolation.

## Examples

### Minimal Application Initialization
```java
@Override
public void init() {
    this.setTemplateRequired(false); // Skip .view template lookup for data-only apps
    // Do NOT call setAction() here — use @Action annotation instead
}
```

### Action Definition and CLI Invocation
```java
@Action("hello")
public String hello() {
    return "Hello, tinystruct!";
}
```
**Execution via Dispatcher:**
```bash
bin/dispatcher hello
bin/dispatcher greet/James
bin/dispatcher echo --words "Hello" --import com.example.HelloApp
```

### Configuration Access
Located at `src/main/resources/application.properties`:
```java
String port = this.getConfiguration("server.port");
```


## Reference: data-handling

# tinystruct Data Handling (JSON)

## When to Use

Prefer `org.tinystruct.data.component.Builder` and `Builders` for lightweight, zero-dependency JSON. Use `Builder` for JSON objects (`{}`), `Builders` for JSON arrays (`[]`). **Always use `Builders` instead of `List<Builder>`** to avoid generic type erasure issues.

## How It Works

`Builder` provides a key-value interface for creating and reading JSON objects. `Builders` provides an indexed list for JSON arrays. Both integrate directly with `AbstractApplication` result handling.

### Why Builder/Builders?
- **Zero External Dependencies** — lean and fast
- **Native Integration** — works with framework result handling
- **Type Safety** — `Builders` serializes properly to `[]`; `List<Builder>` can cause casting issues

## Examples

### Serialize a Single Object
```java
import org.tinystruct.data.component.Builder;

Builder response = new Builder();
response.put("status", "success");
response.put("count", 42);
return response.toString(); // {"status":"success","count":42}
```

### Serialize a List using Builders
```java
import org.tinystruct.data.component.Builder;
import org.tinystruct.data.component.Builders;

Builders dataList = new Builders();
for (MyModel item : myCollection) {
    Builder b = new Builder();
    b.put("id", item.getId());
    b.put("name", item.getName());
    dataList.add(b);
}
Builder response = new Builder();
response.put("data", dataList);
return response.toString(); // {"data":[{"id":1,"name":"X"}]}
```

### Parse a JSON Object
```java
Builder parsed = new Builder();
parsed.parse(jsonString);
String status = parsed.get("status").toString();
```

### Parse a JSON Array
```java
Builders parsedArray = new Builders();
parsedArray.parse(jsonArrayString);
for (int i = 0; i < parsedArray.size(); i++) {
    Builder item = parsedArray.get(i);
    System.out.println(item.get("name"));
}
```


## Reference: database

# tinystruct Database Persistence

## When to Use

Use the built-in ORM-like data layer for database operations. It provides a lightweight alternative to JPA/Hibernate using POJOs extending `AbstractData` and XML mapping files.

## How It Works

### Architecture

Each table is represented by:
1. **Java POJO**: Extends `AbstractData`, provides getters/setters and `setData(Row)`.
2. **Mapping XML**: `ClassName.map.xml` in resources, binding Java fields to DB columns.

#### Key Base Class: `AbstractData`
Provides CRUD methods:
- `append()` / `appendAndGetId()`
- `update()`
- `delete()`
- `findAll()` / `findOneById()` / `findOneByKey(key, value)`
- `findWith(where, params)`
- `find(SQL, params)`

### POJO Generation (CLI)

Introspect a live database table to produce the POJO and mapping file.

#### Configuration
`application.properties`:
```properties
driver=com.mysql.cj.jdbc.Driver
database.url=jdbc:mysql://localhost:3306/mydb
database.user=root
database.password=secret
```

#### Command
```bash
# Interactive mode
bin/dispatcher generate

# Specify table
bin/dispatcher generate --tables users
```

## Examples

### CRUD Operations
```java
// CREATE
User user = new User();
user.setUsername("james");
user.append();

// READ
User user = new User();
user.setId(42);
user.findOneById();

// UPDATE
user.setEmail("new@example.com");
user.update();

// DELETE
user.delete();
```

### Querying with Conditions
```java
User user = new User();
Table results = user.findWith("username LIKE ?", new Object[]{"%jam%"});

// Fluent Condition Builder
Condition condition = new Condition();
condition.setRequestFields("id,username");
Table filtered = user.find(
    condition.select("`users`").and("email LIKE ?").orderBy("id DESC"),
    new Object[]{"%@example.com"}
);
```

### Mapping XML Structure
`User.map.xml`:
```xml
<mapping>
  <class name="User" table="users">
    <id name="Id" column="id" increment="true" generate="false" length="11" type="int"/>
    <property name="username" column="username" length="50" type="varchar"/>
    <property name="email" column="email" length="100" type="varchar"/>
  </class>
</mapping>
```

## Important Rules

1. **File Placement**: The mapping XML **must** mirror the POJO's package path under `src/main/resources/`.
2. **Naming**: Table names are singularized for class names (`users` → `User`). Underscored columns become camelCase fields (`created_at` → `createdAt`).
3. **Setters**: Use `setFieldAsXxx` methods (e.g., `setFieldAsString`) in setters to sync state with the internal field map.
4. **Id Field**: The primary key field in Java is always named `Id` (inherited from `AbstractData`).


## Reference: routing

# tinystruct @Action Routing Reference

## When to Use

Use the `@Action` annotation in your applications to define routes for both CLI commands and HTTP endpoints. It is appropriate whenever you need to map logic to a specific path, handle parameterized requests, or restrict execution to specific HTTP methods while maintaining a consistent command structure across environments.

## How It Works

The `ActionRegistry` parses `@Action` annotations to build a routing table. For parameterized methods, the framework automatically maps Java parameter types to corresponding regex segments.

### Regex Generation Rules
- `getUser(int id)` → pattern: `^/?user/(-?\d+)$`
- `search(String query)` → pattern: `^/?search/([^/]+)$`

Supported parameter types: `String`, `int/Integer`, `long/Long`, `float/Float`, `double/Double`, `boolean/Boolean`, `char/Character`, `short/Short`, `byte/Byte`, `Date` (parsed as `yyyy-MM-dd HH:mm:ss`).

### Mode Values

| Mode | When it triggers |
|---|---|
| `DEFAULT` | Both CLI and HTTP (GET, POST, etc.) |
| `CLI` | CLI dispatcher only |
| `HTTP_GET` | HTTP GET only |
| `HTTP_POST` | HTTP POST only |
| `HTTP_PUT` | HTTP PUT only |
| `HTTP_DELETE` | HTTP DELETE only |
| `HTTP_PATCH` | HTTP PATCH only |

> **Note:** You can map HTTP method names to `Mode` using `Action.Mode.fromName(String methodName)`. Unknown or null values return `Mode.DEFAULT`.

## Examples

### Basic Action Declaration
```java
@Action(
    value = "path/subpath",          // required: URI segment or CLI command
    description = "What it does",    // shown in --help output
    mode = Mode.DEFAULT,             // default: Mode.DEFAULT
    example = "bin/dispatcher path/subpath/42"
)
public String myAction(int id) { ... }
```

### Parameterized Paths
```java
@Action("user/{id}")
public String getUser(int id) { ... }
// → CLI: bin/dispatcher user/42
// → HTTP: /?q=user/42
```

### Dependency Injection
`ActionRegistry` automatically injects `Request` and/or `Response` from `Context` if they are parameters:

```java
@Action(value = "upload", mode = Mode.HTTP_POST)
public String upload(Request<?, ?> req, Response<?, ?> res) throws ApplicationException {
    // Access raw request/response if needed
    return "ok";
}
```

### Path Matching Priority
If two methods share the same path, the framework uses the first match in the `ActionRegistry`. Use explicit `Mode` values to disambiguate (e.g., separating a GET for a form and a POST for submission).


## Reference: system-usage

# tinystruct System and Usage Reference

## When to Use

Use these patterns to handle request state, manage web sessions, implement Server-Sent Events (SSE), handle file uploads, or perform outbound HTTP networking.

## How It Works

### Context and CLI Arguments
`Context` is the primary data store for request-specific state. CLI flags passed as `--key value` are stored in `Context` as `"--key"`.

### Session Management
Pluggable architecture. Default is `MemorySessionRepository`. Configure Redis in `application.properties`:
```properties
default.session.repository=org.tinystruct.http.RedisSessionRepository
redis.host=127.0.0.1
redis.port=6379
```

### Server-Sent Events (SSE)
Built-in support for real-time push. The `HttpServer` automatically handles the SSE lifecycle when it detects the `Accept: text/event-stream` header. Connections are tracked by session ID in `SSEPushManager`.

### Outbound Networking
Use `URLRequest` and `HTTPHandler` for making HTTP requests to external services.

## Examples

### Context and CLI Arguments
```java
@Action("echo")
public String echo() {
    // CLI: bin/dispatcher echo --words "Hello World"
    Object words = getContext().getAttribute("--words");
    if (words != null) return words.toString();
    return "No words provided";
}
```

### Session Management
```java
@Action(value = "login", mode = Mode.HTTP_POST)
public String login(Request<?, ?> request) {
    request.getSession().setAttribute("userId", "42");
    return "Logged in";
}
```

### Server-Sent Events (SSE)
```java
@Action("sse/connect")
public String connect() {
    return "{\"type\":\"connect\",\"message\":\"Connected\"}";
}

// In another method or event handler:
String sessionId = getContext().getId();
SSEPushManager.getInstance().push(sessionId, new Builder().put("msg", "hello"));
```

### File Uploads
```java
import org.tinystruct.data.FileEntity;

@Action(value = "upload", mode = Mode.HTTP_POST)
public String upload(Request<?, ?> request) throws ApplicationException {
    List<FileEntity> files = request.getAttachments();
    if (files != null) {
        for (FileEntity file : files) {
            // file.getFilename(), file.getContent()
        }
    }
    return "Uploaded";
}
```

### Outbound HTTP
```java
import org.tinystruct.net.URLRequest;
import org.tinystruct.net.handlers.HTTPHandler;

URLRequest request = new URLRequest(new URL("https://api.example.com"));
request.setMethod("POST").setBody("{\"data\":\"val\"}");

HTTPHandler handler = new HTTPHandler();
var response = handler.handleRequest(request);
if (response.getStatusCode() == 200) {
    String body = response.getBody();
}
```

### Event System
Register handlers in `init()` for asynchronous task execution.
```java
EventDispatcher.getInstance().registerHandler(MyEvent.class, event -> {
    CompletableFuture.runAsync(() -> doHeavyWork(event.getPayload()));
});
```


## Reference: testing

# tinystruct Testing Patterns

## When to Use

Use these patterns when writing unit tests for your applications with **JUnit 5**. Essential for verifying action logic, routing registration, and HTTP mode behavior.

## How It Works

### Unit Testing Applications
ActionRegistry is a singleton. To test an application:
1. Instantiate the application.
2. Provide a `Settings` object (triggers `init()` and annotation processing).
3. Use `app.invoke(path, args)` to test logic directly.

### HTTP Integration Testing
For tests involving the built-in HTTP server:
1. Start `HttpServer` in a background thread.
2. Use `ApplicationManager.call("start", context, Action.Mode.CLI)` to boot.
3. Wait for the port to be open using a `Socket`.
4. Use `URLRequest` and `HTTPHandler` to perform actual requests.

## Examples

### Unit Test
```java
import org.junit.jupiter.api.*;
import org.tinystruct.system.Settings;

class MyAppTest {
    private MyApp app;

    @BeforeEach
    void setUp() {
        app = new MyApp();
        app.setConfiguration(new Settings());
        app.init(); // triggers @Action annotation processing and registers all actions
    }

    @Test
    void testHello() throws Exception {
        Object result = app.invoke("hello");
        Assertions.assertEquals("Hello!", result);
    }

    @Test
    void testGreet() throws Exception {
        Object result = app.invoke("greet", new Object[]{"James"});
        Assertions.assertEquals("Hello, James!", result);
    }
}
```

### ActionRegistry Match Testing
```java
@Test
void testRouting() {
    ActionRegistry registry = ActionRegistry.getInstance();
    Action action = registry.getAction("greet/James");
    Assertions.assertNotNull(action);
}
```

### HTTP Integration Pattern
Reference: `src/test/java/org/tinystruct/system/HttpServerHttpModeTest.java`

```java
// Pattern:
// 1. Start server in thread
// 2. Poll for port availability
// 3. Send HTTP request via HTTPHandler
// 4. Assert response body/status
```

