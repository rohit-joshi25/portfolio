export type Level = "basic" | "intermediate" | "advanced";
export type Kind = "conceptual" | "coding";

export type InterviewQuestion = {
  id: string;
  category: string;
  level: Level;
  kind: Kind;
  q: string;
  a: string;
  code?: string;
};

export const interviewCategories = [
  "Laravel Core",
  "Routing & Middleware",
  "Eloquent & Database",
  "SQL",
  "Validation & Requests",
  "Auth & Security",
  "APIs",
  "Queues, Events & Jobs",
  "Caching & Performance",
  "Architecture",
  "PHP & OOP",
  "Testing & Debugging",
  "Redis, Docker & Ops",
  "Coding Problems",
] as const;

export const laravelInterviewQuestions: InterviewQuestion[] = [
  // ─── Laravel Core ─────────────────────────────────────────
  {
    id: "c1",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "What is Laravel and why do teams use it?",
    a: "Laravel is a PHP framework that follows MVC. Teams use it because routing, Eloquent ORM, migrations, queues, auth, and artisan tooling are built in — so you ship features faster with consistent structure. For 1 year exp, say: you use it to build REST APIs and admin panels with less boilerplate and better security defaults (CSRF, hashing, prepared statements via Eloquent).",
  },
  {
    id: "c2",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "Explain the Laravel request lifecycle.",
    a: "1) public/index.php boots the app. 2) HTTP kernel loads. 3) Service providers register then boot. 4) Request passes through global + route middleware. 5) Router matches a controller/closure. 6) Controller uses services/models and returns a response. 7) Response middleware runs, then output is sent. Interview tip: mention Kernel.php and service providers — that shows you know where the app is wired.",
  },
  {
    id: "c3",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "What is Artisan? Name commands you use daily.",
    a: "Artisan is Laravel’s CLI. Daily ones: php artisan serve, make:controller, make:model -m, make:migration, migrate, db:seed, route:list, tinker, queue:work, config:clear, cache:clear, optimize:clear. Never run config:cache in local if .env keeps changing — cached config ignores new env keys until you clear it.",
  },
  {
    id: "c4",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "What are service providers?",
    a: "Service providers are the bootstrapping classes of Laravel. register() binds things into the container (no other services assumed ready). boot() runs after all providers are registered — use it for routes, views, event listeners, gates. config/app.php (or bootstrap/providers.php in Laravel 11+) lists them.",
  },
  {
    id: "c5",
    category: "Laravel Core",
    level: "intermediate",
    kind: "conceptual",
    q: "What is the Service Container / IoC?",
    a: "The container resolves class dependencies automatically. If a controller constructor type-hints OrderService, Laravel instantiates it and injects nested dependencies too. You bind interfaces to implementations in a provider: $this->app->bind(PaymentGateway::class, StripeGateway::class). This is how you swap implementations and write testable code.",
    code: `public function __construct(private OrderService $orders) {}

// In AppServiceProvider::register()
$this->app->bind(PaymentGateway::class, StripeGateway::class);`,
  },
  {
    id: "c6",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "Facade vs helper vs injected class — when to use which?",
    a: "Facades (Cache::get) are static-looking proxies to container bindings — fine in controllers. Helpers (cache(), now()) are shortcuts. Constructor injection is best for services you want to mock in tests. In interviews, say: you prefer injection for business services, facades for thin controller code.",
  },
  {
    id: "c7",
    category: "Laravel Core",
    level: "intermediate",
    kind: "conceptual",
    q: "What is Composer PSR-4 autoloading?",
    a: "composer.json maps namespaces to folders, e.g. App\\ → app/. When you use App\\Models\\User, Composer loads app/Models/User.php without require. After adding a new class in a non-standard path, run composer dump-autoload. Laravel packages follow the same convention.",
  },
  {
    id: "c8",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: ".env vs config files — which should code read?",
    a: "Application code should call config('app.name'), never env('APP_NAME') outside config files. Reason: php artisan config:cache dumps config to a file and env() then returns null in many places. Put env() only inside config/*.php.",
    code: `// config/services.php
'stripe_key' => env('STRIPE_KEY'),

// anywhere else
config('services.stripe_key');`,
  },
  {
    id: "c9",
    category: "Laravel Core",
    level: "advanced",
    kind: "conceptual",
    q: "register() vs boot() — what breaks if you mix them up?",
    a: "If you use another service (Gate, Event, config of another provider) inside register(), it may not be ready yet. Bindings and singletons go in register(). Event::listen, Gate::define, View::composer, publishing config — boot(). A classic bug: calling env() or another provider’s facade too early in register().",
  },
  {
    id: "c10",
    category: "Laravel Core",
    level: "intermediate",
    kind: "conceptual",
    q: "What does php artisan optimize:clear do, and when do you use it?",
    a: "It clears config, route, view, and application cache. Use it when production/staging behaves like old config, routes 404 after deploy, or Blade looks stale. Do not confuse with config:cache which *creates* cache for production speed.",
  },

  // ─── Routing & Middleware ─────────────────────────────────
  {
    id: "r1",
    category: "Routing & Middleware",
    level: "basic",
    kind: "conceptual",
    q: "web.php vs api.php — what is the difference?",
    a: "web routes use session, CSRF, cookies (StartSession, VerifyCsrfToken). api routes are stateless, prefixed with /api, throttled, typically Sanctum/JWT token auth. Don’t put CSRF-protected form posts on api.php unless you know why.",
  },
  {
    id: "r2",
    category: "Routing & Middleware",
    level: "basic",
    kind: "conceptual",
    q: "What is middleware? Give 3 real examples.",
    a: "Middleware filters HTTP requests. Examples: auth (must be logged in), throttle (rate limit), role:admin (custom), cors, encrypt cookies. Global middleware runs on every request; route middleware only on assigned routes.",
  },
  {
    id: "r3",
    category: "Routing & Middleware",
    level: "basic",
    kind: "coding",
    q: "Write a route group for admin with prefix, name, and middleware.",
    a: "Group shared prefix, names, and auth+role middleware so you don’t repeat them.",
    code: `Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/students', [StudentController::class, 'index'])->name('students.index');
        Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    });`,
  },
  {
    id: "r4",
    category: "Routing & Middleware",
    level: "intermediate",
    kind: "coding",
    q: "Write middleware that allows only school_id in JWT/session to access a resource.",
    a: "Abort 403 if the authenticated user’s school does not match the route school. Typical in multi-tenant apps like OEMS.",
    code: `public function handle(Request $request, Closure $next)
{
    $user = $request->user();
    $schoolId = $request->route('school')?->id ?? $request->input('school_id');

    if (!$user || (int) $user->school_id !== (int) $schoolId) {
        abort(403, 'Unauthorized for this school.');
    }

    return $next($request);
}`,
  },
  {
    id: "r5",
    category: "Routing & Middleware",
    level: "intermediate",
    kind: "conceptual",
    q: "Implicit vs explicit route model binding?",
    a: "Implicit: Route::get('/users/{user}', ...) type-hint User $user — Laravel fetches by id (or getRouteKeyName()). Explicit: Route::model('user', User::class) or Route::bind('user', fn ($v) => User::where('uuid', $v)->firstOrFail()). Use uuid/slug as route key to avoid exposing sequential ids.",
    code: `public function getRouteKeyName(): string
{
    return 'uuid';
}`,
  },
  {
    id: "r6",
    category: "Routing & Middleware",
    level: "advanced",
    kind: "conceptual",
    q: "How does middleware parameter passing work (e.g. role:admin)?",
    a: "You register alias 'role' => EnsureRole::class. Route: middleware('role:admin,editor'). handle(Request $request, Closure $next, ...$roles). Extra segments after : are passed as parameters. Multiple values are comma-separated.",
  },
  {
    id: "r7",
    category: "Routing & Middleware",
    level: "basic",
    kind: "coding",
    q: "Write a resource route and list the 7 methods it creates.",
    a: "Route::resource('posts', PostController::class) creates index, create, store, show, edit, update, destroy. For APIs use apiResource (no create/edit views).",
    code: `Route::resource('posts', PostController::class);
Route::apiResource('posts', PostController::class);

// php artisan route:list --name=posts`,
  },
  {
    id: "r8",
    category: "Routing & Middleware",
    level: "intermediate",
    kind: "conceptual",
    q: "What is CSRF and how does Laravel protect forms?",
    a: "CSRF tricks a logged-in browser into submitting a state-changing request. Laravel’s VerifyCsrfToken middleware checks a token from the session vs _token field or X-CSRF-TOKEN header. Blade: @csrf. APIs using tokens (Sanctum SPA with cookies still needs CSRF; pure Bearer token APIs typically don’t use web CSRF).",
  },

  // ─── Eloquent & Database ──────────────────────────────────
  {
    id: "e1",
    category: "Eloquent & Database",
    level: "basic",
    kind: "conceptual",
    q: "Eloquent vs Query Builder vs raw SQL — when?",
    a: "Eloquent: models, relationships, events, readable CRUD. Query Builder (DB::table): slightly faster, no model overhead, good for reports. Raw SQL: complex analytics, but bind parameters always. Default to Eloquent; drop to query builder for heavy aggregations.",
  },
  {
    id: "e2",
    category: "Eloquent & Database",
    level: "basic",
    kind: "conceptual",
    q: "$fillable vs $guarded vs $hidden.",
    a: "$fillable = mass-assignable fields (whitelist). $guarded = blacklist (empty array [] means all fillable — dangerous). Never leave $guarded = [] on production models with request()->all(). $hidden hides attributes in JSON (password, remember_token). $casts converts types (datetime, array, boolean, encrypted).",
  },
  {
    id: "e3",
    category: "Eloquent & Database",
    level: "basic",
    kind: "conceptual",
    q: "Explain hasOne, hasMany, belongsTo, belongsToMany.",
    a: "User hasOne Profile (profile.user_id). User hasMany Post. Post belongsTo User. User belongsToMany Role via role_user pivot. Inverse of hasMany is belongsTo. Many-to-many needs a pivot table named alphabetically by convention (role_user).",
  },
  {
    id: "e4",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "What is the N+1 problem and how do you fix it?",
    a: "Looping posts and accessing $post->user runs 1 query + N user queries. Fix with eager loading: Post::with('user')->get(). Nested: with('user.profile', 'comments.author'). Use withCount('comments'). Detect with Laravel Debugbar, Telescope, or ->toSql() / listen to DB::listen. Prevent lazy load in local: Model::preventLazyLoading().",
    code: `// Bad
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->user->name;
}

// Good
$posts = Post::with('user')->get();`,
  },
  {
    id: "e5",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Write relationships: School has many Students; Student belongs to School and many Exams (pivot exam_student with score).",
    a: "Define both sides and the pivot extra column.",
    code: `// School.php
public function students()
{
    return $this->hasMany(Student::class);
}

// Student.php
public function school()
{
    return $this->belongsTo(School::class);
}

public function exams()
{
    return $this->belongsToMany(Exam::class)
        ->withPivot('score')
        ->withTimestamps();
}`,
  },
  {
    id: "e6",
    category: "Eloquent & Database",
    level: "basic",
    kind: "coding",
    q: "Write a migration to create students with unique email per school.",
    a: "Composite unique index (school_id, email) is the correct constraint.",
    code: `Schema::create('students', function (Blueprint $table) {
    $table->id();
    $table->foreignId('school_id')->constrained()->cascadeOnDelete();
    $table->string('name');
    $table->string('email');
    $table->string('password');
    $table->timestamps();

    $table->unique(['school_id', 'email']);
});`,
  },
  {
    id: "e7",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Fetch students who have at least one exam score > 80.",
    a: "Use whereHas on the relationship with pivot constraint.",
    code: `Student::whereHas('exams', function ($q) {
    $q->where('exam_student.score', '>', 80);
})->get();`,
  },
  {
    id: "e8",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "Soft deletes — how do they work? How do you include deleted rows?",
    a: "Use SoftDeletes trait + deleted_at column. Eloquent hides those rows by default. withTrashed(), onlyTrashed(), restore(), forceDelete(). Unique indexes still see soft-deleted rows — a common production bug when re-creating the same email.",
    code: `User::withTrashed()->find($id);
User::onlyTrashed()->restore();`,
  },
  {
    id: "e9",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "Polymorphic relations — when and an example.",
    a: "When many models share a related type: comments on posts and videos. commentable_id + commentable_type. morphTo / morphMany. Don’t overuse — they are harder to index and constrain with FKs. Good for activity logs, attachments, comments.",
    code: `// Comment.php
public function commentable()
{
    return $this->morphTo();
}

// Post.php
public function comments()
{
    return $this->morphMany(Comment::class, 'commentable');
}`,
  },
  {
    id: "e10",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "Accessors, mutators, and casts (Laravel 9+ style).",
    a: "Attribute::make(get:, set:) formats values when reading/writing. Casts handle json, datetime, hashed, encrypted, decimal. Prefer casts for passwords (hashed) instead of a custom mutator.",
    code: `protected function name(): Attribute
{
    return Attribute::make(
        get: fn (string $value) => ucfirst($value),
        set: fn (string $value) => strtolower($value),
    );
}

protected $casts = [
    'email_verified_at' => 'datetime',
    'settings' => 'array',
    'password' => 'hashed',
];`,
  },
  {
    id: "e11",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Write a local scope: Student::active()->ofGrade('10-A').",
    a: "Local scopes are query builder macros on the model.",
    code: `public function scopeActive(Builder $query): void
{
    $query->where('is_active', true);
}

public function scopeOfGrade(Builder $query, string $grade): void
{
    $query->where('grade', $grade);
}

// Student::active()->ofGrade('10-A')->get();`,
  },
  {
    id: "e12",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "chunk() vs cursor() vs lazy() for 1 lakh rows.",
    a: "chunk(1000, callback) runs repeated LIMIT/OFFSET (offset gets slow on huge tables). lazy() / lazyById() is chunked internally, better. cursor() uses a PDO cursor, one model at a time, lowest memory but keeps one connection open. For updates, chunkById() is safest so pagination doesn’t skip rows.",
    code: `User::query()->orderBy('id')->chunkById(500, function ($users) {
    foreach ($users as $user) {
        // process
    }
});`,
  },
  {
    id: "e13",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Wrap money transfer in a DB transaction. Why?",
    a: "If the second update fails, the first must roll back so balances stay consistent.",
    code: `DB::transaction(function () use ($from, $to, $amount) {
    $from->decrement('balance', $amount);
    $to->increment('balance', $amount);
});

// or
DB::beginTransaction();
try {
    // ...
    DB::commit();
} catch (\\Throwable $e) {
    DB::rollBack();
    throw $e;
}`,
  },
  {
    id: "e14",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "How do you stop SQL injection in Laravel?",
    a: "Use Eloquent/Query Builder bindings: where('email', $email) never interpolates. Avoid DB::raw(\"where name = '$name'\"). If you need raw: whereRaw('price > ?', [$min]). Also validate input, use mass-assignment protection, and parameterized PDO. Blade {{ }} escapes XSS (HTML), not a substitute for SQL bindings.",
    code: `// Safe
User::where('email', $email)->first();
DB::select('select * from users where email = ?', [$email]);

// Unsafe
DB::select(\"select * from users where email = '$email'\");`,
  },
  {
    id: "e15",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "first() vs firstOrFail() vs findOrFail() vs updateOrCreate().",
    a: "first() returns null. firstOrFail()/findOrFail() throw ModelNotFoundException → 404. updateOrCreate(['email' => $e], ['name' => $n]) finds by first array, updates/creates with second. firstOrCreate similar but doesn’t update existing extra fields. Useful for idempotent imports.",
  },
  {
    id: "e16",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "When do you add a database index? What is a covering/composite index?",
    a: "Index columns used in WHERE, JOIN, ORDER BY, UNIQUE. Composite index (school_id, created_at) helps queries that filter school then sort by date. Leftmost prefix rule: (a,b) helps a and a+b, not b alone. Too many indexes slow writes. Explain EXPLAIN in interviews if you have used it.",
  },
  {
    id: "e17",
    category: "Eloquent & Database",
    level: "basic",
    kind: "conceptual",
    q: "Migrations vs seeders vs factories.",
    a: "Migrations version the schema. Seeders insert demo/reference data. Factories generate fake model data for tests/seeds. Never seed production passwords in plaintext; use Hash::make. Run migrate on deploy; seed only when intended.",
  },
  {
    id: "e18",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Observers vs model events — write an Observer example.",
    a: "Observers keep models thin. creating/created/updating/updated/deleting. Don’t run heavy IO in observers without queues — they hide side effects.",
    code: `class UserObserver
{
    public function created(User $user): void
    {
        SendWelcomeEmail::dispatch($user);
    }

    public function deleting(User $user): void
    {
        $user->tokens()->delete();
    }
}

// AppServiceProvider::boot
User::observe(UserObserver::class);`,
  },

  // ─── Validation & Requests ────────────────────────────────
  {
    id: "v1",
    category: "Validation & Requests",
    level: "basic",
    kind: "conceptual",
    q: "Controller validate() vs Form Request — which and why?",
    a: "Form Requests (php artisan make:request StoreStudentRequest) keep controllers thin, reuse rules, and hold authorize(). Use them when rules grow or authorization is needed. $request->validated() returns only allowed fields — never request()->all() into create().",
  },
  {
    id: "v2",
    category: "Validation & Requests",
    level: "intermediate",
    kind: "coding",
    q: "Write StoreStudentRequest with unique email on create and ignore self on update.",
    a: "unique:table,column,except,idColumn. On update, ignore the current student id.",
    code: `public function authorize(): bool
{
    return $this->user()?->can('create', Student::class) ?? false;
}

public function rules(): array
{
    $id = $this->route('student')?->id;

    return [
        'name'  => ['required', 'string', 'max:255'],
        'email' => [
            'required',
            'email',
            Rule::unique('students', 'email')
                ->where(fn ($q) => $q->where('school_id', $this->user()->school_id))
                ->ignore($id),
        ],
        'grade' => ['nullable', 'string', 'max:50'],
    ];
}`,
  },
  {
    id: "v3",
    category: "Validation & Requests",
    level: "basic",
    kind: "conceptual",
    q: "Common validation rules you should know.",
    a: "required, nullable, string, integer, numeric, boolean, email, unique, exists, confirmed, min/max/between, in, array, date, file, mimes, image, regex, sometimes, required_if, current_password. exists:users,id prevents orphan FKs from request data.",
  },
  {
    id: "v4",
    category: "Validation & Requests",
    level: "advanced",
    kind: "coding",
    q: "Custom rule: password must not contain the user’s email local-part.",
    a: "Implement Illuminate\\Contracts\\Validation\\ValidationRule (Laravel 10+) or Rule object.",
    code: `class NotEmailLocalPart implements ValidationRule
{
    public function __construct(private string $email) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $local = strtolower(strtok($this->email, '@'));
        if ($local && str_contains(strtolower((string) $value), $local)) {
            $fail('Password must not contain your email name.');
        }
    }
}

'password' => ['required', 'min:8', new NotEmailLocalPart($this->email)],`,
  },
  {
    id: "v5",
    category: "Validation & Requests",
    level: "intermediate",
    kind: "conceptual",
    q: "What is $request->validated() vs all() vs only()?",
    a: "all() includes extra fields attackers add (is_admin=1). validated() is the safe list after rules pass. only(['name','email']) still can miss validation. Always persist validated().",
  },

  // ─── Auth & Security ──────────────────────────────────────
  {
    id: "a1",
    category: "Auth & Security",
    level: "basic",
    kind: "conceptual",
    q: "Hashing vs encryption. How does Laravel store passwords?",
    a: "Hashing is one-way (bcrypt/argon2 via Hash::make / 'hashed' cast). Encryption is two-way (Crypt::encryptString) for secrets you must read back. Never encrypt passwords — hash them. Hash::check($plain, $hashed) verifies. Don’t log passwords.",
  },
  {
    id: "a2",
    category: "Auth & Security",
    level: "intermediate",
    kind: "conceptual",
    q: "Session auth vs Sanctum vs JWT — when?",
    a: "Session + cookies: Blade/Livewire same-domain apps. Laravel Sanctum: SPA (cookie + CSRF) or simple API tokens for mobile. JWT (tymon/jwt-auth or custom): stateless APIs, microservices (like OEMS BFFs) where each service validates the token with a shared secret/public key. JWT is not a Laravel built-in; Sanctum tokens are stored hashed in personal_access_tokens.",
  },
  {
    id: "a3",
    category: "Auth & Security",
    level: "intermediate",
    kind: "conceptual",
    q: "Gates vs Policies.",
    a: "Gates: simple closures (Gate::define('view-admin', fn ($user) => $user->is_admin)). Policies: class per model (StudentPolicy@update). Use policies for CRUD on models, gates for one-off abilities. In controllers: $this->authorize('update', $student); Blade: @can('update', $student).",
  },
  {
    id: "a4",
    category: "Auth & Security",
    level: "advanced",
    kind: "conceptual",
    q: "XSS, CSRF, SQL injection, mass assignment — Laravel defenses.",
    a: "XSS: Blade {{ }} escapes; {!! !!} is dangerous. CSRF: @csrf + middleware on web. SQLi: query bindings. Mass assignment: $fillable + validated(). Also: HTTPS, rate limiting, hashed passwords, APP_DEBUG=false in production, never expose .env, authorize() in form requests, hide ids with UUIDs if needed.",
  },
  {
    id: "a5",
    category: "Auth & Security",
    level: "basic",
    kind: "coding",
    q: "Write a Policy method: only same-school admin can update a student.",
    a: "Compare school_id and role.",
    code: `public function update(User $user, Student $student): bool
{
    return $user->school_id === $student->school_id
        && $user->hasRole('admin');
}`,
  },
  {
    id: "a6",
    category: "Auth & Security",
    level: "advanced",
    kind: "conceptual",
    q: "What is in a JWT? How do you invalidate it?",
    a: "Header.payload.signature. Payload has sub (user id), exp, iss, role claims. Signature proves it wasn’t tampered. Stateless JWT cannot be revoked unless you keep a denylist (jti in Redis) or use short TTL + refresh tokens. That’s why many Laravel APIs use Sanctum tokens (revocable in DB) or a denylist for logout.",
  },
  {
    id: "a7",
    category: "Auth & Security",
    level: "intermediate",
    kind: "conceptual",
    q: "Why APP_DEBUG=true is dangerous in production?",
    a: "Stack traces leak env, SQL, paths, and class names. Combined with APP_KEY leak, encrypted data can be forged. Always APP_DEBUG=false, custom error pages, log exceptions to log/Sentry not to the browser.",
  },
  {
    id: "a8",
    category: "Auth & Security",
    level: "intermediate",
    kind: "coding",
    q: "Throttle login attempts.",
    a: "Use throttle middleware or RateLimiter.",
    code: `Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1'); // 5 per minute

RateLimiter::for('login', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip());
});`,
  },

  // ─── APIs ─────────────────────────────────────────────────
  {
    id: "p1",
    category: "APIs",
    level: "basic",
    kind: "conceptual",
    q: "What is REST? What HTTP codes do you return?",
    a: "REST uses resources + HTTP verbs: GET (read), POST (create), PUT/PATCH (update), DELETE. Codes: 200 OK, 201 Created, 204 No Content, 400 validation, 401 unauthenticated, 403 forbidden, 404 not found, 409 conflict, 422 Unprocessable (Laravel validation), 429 rate limit, 500 server error. Don’t return 200 for failures.",
  },
  {
    id: "p2",
    category: "APIs",
    level: "intermediate",
    kind: "coding",
    q: "Write an API Resource for Student (hide internals, include school name).",
    a: "Resources shape JSON consistently and hide password, etc.",
    code: `class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'grade' => $this->grade,
            'school' => $this->whenLoaded('school', fn () => [
                'id' => $this->school->id,
                'name' => $this->school->name,
            ]),
        ];
    }
}

return StudentResource::collection($students);`,
  },
  {
    id: "p3",
    category: "APIs",
    level: "intermediate",
    kind: "conceptual",
    q: "How do you version APIs (/api/v1)?",
    a: "Prefix routes: Route::prefix('v1')->group(...). Separate controllers or namespaces. Don’t break existing clients. Header versioning (Accept: application/vnd.myapp.v2+json) is more advanced. For 1 year exp, URL prefix is the expected answer.",
  },
  {
    id: "p4",
    category: "APIs",
    level: "advanced",
    kind: "conceptual",
    q: "Idempotency — why does it matter for POST payments?",
    a: "Retrying POST can double-charge. Clients send Idempotency-Key; you store key→response in Redis/DB and return the same result. PUT/DELETE are naturally idempotent; POST is not. In exam/registration systems, the same apply for ‘start exam’ or ‘submit payment’.",
  },
  {
    id: "p5",
    category: "APIs",
    level: "basic",
    kind: "coding",
    q: "Return paginated JSON the Laravel way.",
    a: "paginate() includes links and meta. Use Resource::collection.",
    code: `$students = Student::query()
    ->where('school_id', auth()->user()->school_id)
    ->paginate(20);

return StudentResource::collection($students);`,
  },
  {
    id: "p6",
    category: "APIs",
    level: "intermediate",
    kind: "conceptual",
    q: "CORS — what is it and where is it configured?",
    a: "Browsers block JS on origin A from reading responses of origin B unless the server sends Access-Control-Allow-Origin. Laravel: config/cors.php, HandleCors middleware. Credentials need explicit origin, not *. APIs called from a separate frontend (Next.js) must allow that origin.",
  },
  {
    id: "p7",
    category: "APIs",
    level: "advanced",
    kind: "conceptual",
    q: "BFF pattern — what did you build in OEMS-style systems?",
    a: "BFF (Backend for Frontend) is an API layer per client (admin/student/superadmin). The browser talks to one BFF; the BFF calls downstream microservices (identity, school, exam) with JWT. Benefit: hide internal services, aggregate responses, apply portal-specific auth. Mention DownstreamClient, JWT forwarding, and not exposing internal ports publicly.",
  },

  // ─── Queues, Events & Jobs ────────────────────────────────
  {
    id: "q1",
    category: "Queues, Events & Jobs",
    level: "basic",
    kind: "conceptual",
    q: "Why queues? Sync vs database vs Redis driver.",
    a: "Queues move slow work (emails, reports, webhooks) off the HTTP request. sync runs immediately (local). database stores jobs in jobs table (simple, slower). redis is the usual production choice. Need a worker: php artisan queue:work. Supervisor keeps workers alive.",
  },
  {
    id: "q2",
    category: "Queues, Events & Jobs",
    level: "intermediate",
    kind: "coding",
    q: "Dispatch a job to send exam result email after submit.",
    a: "Implement ShouldQueue. Handle failures with $tries, $backoff, failed().",
    code: `class SendExamResultMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public array $backoff = [10, 60, 300];

    public function __construct(public ExamAttempt $attempt) {}

    public function handle(): void
    {
        Mail::to($this->attempt->student->email)
            ->send(new ExamResultMail($this->attempt));
    }
}

SendExamResultMail::dispatch($attempt);`,
  },
  {
    id: "q3",
    category: "Queues, Events & Jobs",
    level: "intermediate",
    kind: "conceptual",
    q: "Events vs Jobs vs Listeners vs Notifications.",
    a: "Event = something happened (ExamSubmitted). Listeners react (update stats, send mail). Jobs = unit of queued work. Notifications = user-facing channel (mail, database, SMS). Pattern: controller dispatches event; listeners dispatch jobs. Don’t put 200 lines in the controller after submit.",
  },
  {
    id: "q4",
    category: "Queues, Events & Jobs",
    level: "advanced",
    kind: "conceptual",
    q: "Failed jobs, retries, timeout, unique jobs.",
    a: "failed_jobs table + queue:retry. $timeout kills long jobs. $tries / retryUntil. ShouldBeUnique prevents duplicate ‘generate report’ jobs (needs cache driver). Always make jobs idempotent — workers can retry. Don’t pass huge Eloquent graphs; pass ids and re-fetch.",
  },
  {
    id: "q5",
    category: "Queues, Events & Jobs",
    level: "basic",
    kind: "conceptual",
    q: "Task scheduling: how does Kernel.php / routes/console.php schedule work?",
    a: "You define ->daily() / ->everyFiveMinutes() in the scheduler, but cron must hit php artisan schedule:run every minute. Without the cron, nothing runs. Common for report emails, cleaning expired OTPs, closing exams.",
    code: `Schedule::command('exams:close-expired')->everyMinute();
Schedule::job(new PurgeOtps)->dailyAt('02:00');`,
  },

  // ─── Caching & Performance ────────────────────────────────
  {
    id: "k1",
    category: "Caching & Performance",
    level: "basic",
    kind: "conceptual",
    q: "config:cache, route:cache, view:cache — production only?",
    a: "Yes for most teams. They speed boot. Locally they cause ‘my new route doesn’t exist’ bugs. After deploy: config:cache, route:cache, view:cache, then restart queue workers so they pick new code (queue:restart).",
  },
  {
    id: "k2",
    category: "Caching & Performance",
    level: "intermediate",
    kind: "coding",
    q: "Cache a school’s exam list for 10 minutes. Invalidate on update.",
    a: "Cache::remember + forget on write. Use a key that includes school id.",
    code: `$exams = Cache::remember("school:{$schoolId}:exams", 600, function () use ($schoolId) {
    return Exam::where('school_id', $schoolId)->get();
});

Cache::forget("school:{$schoolId}:exams");`,
  },
  {
    id: "k3",
    category: "Caching & Performance",
    level: "advanced",
    kind: "conceptual",
    q: "Cache stampede / atomic locks. Redis vs file cache.",
    a: "File cache is per-server (bad with multiple app nodes). Redis is shared. Stampede: many requests miss cache together and hit DB — use lock() or remember with a single filler. Cache::lock('sync-exam', 10)->get(fn () => ...). Don’t cache user-specific PII in public keys.",
  },
  {
    id: "k4",
    category: "Caching & Performance",
    level: "intermediate",
    kind: "conceptual",
    q: "How do you find a slow page in Laravel?",
    a: "Debugbar / Telescope locally. Log DB::listen. Check N+1, missing indexes, loading unused columns (select()), huge collections vs paginate, sync mail in request, debug images. Production: slow query log, APM (New Relic/Sentry performance), EXPLAIN.",
  },
  {
    id: "k5",
    category: "Caching & Performance",
    level: "advanced",
    kind: "conceptual",
    q: "select() and avoiding SELECT *.",
    a: "User::select('id','name')->get() reduces memory and payload. But then $user->email is null and you can accidentally save empty fields — be careful with updating partial models. For APIs, resources + select is a good combo.",
  },

  // ─── Architecture ─────────────────────────────────────────
  {
    id: "h1",
    category: "Architecture",
    level: "intermediate",
    kind: "conceptual",
    q: "Fat controllers vs Services vs Actions — what do you prefer?",
    a: "Controllers should: authorize, validate, call a service, return response. Business logic (create exam + questions + notify) goes to a Service or single-purpose Action class. Repositories are optional; don’t add them if they only wrap Eloquent 1:1. Interviewers like: ‘I extract when the controller exceeds simple CRUD’.",
  },
  {
    id: "h2",
    category: "Architecture",
    level: "advanced",
    kind: "conceptual",
    q: "Repository pattern — is it always needed in Laravel?",
    a: "Not always. Eloquent already is an Active Record. Repositories help if you must swap persistence or you have complex queries reused in many places. Fake benefit: ‘testability’ — you can mock services without a repository. Don’t copy Java enterprise layering blindly in a 1-year Laravel role.",
  },
  {
    id: "h3",
    category: "Architecture",
    level: "advanced",
    kind: "conceptual",
    q: "How would you split a monolith into Laravel microservices?",
    a: "Split by domain (identity, school, exam, notification), each with its own DB. Communicate via HTTP/JWT or queues. Shared contracts (OpenAPI). Challenges: transactions across services, auth, latency, ops (Docker, Consul). OEMS-style: BFF aggregates; services don’t share tables. Don’t split too early — modular monolith is often enough.",
  },
  {
    id: "h4",
    category: "Architecture",
    level: "intermediate",
    kind: "conceptual",
    q: "Dependency inversion in Laravel — interface + bind.",
    a: "High-level OrderService depends on PaymentGateway interface, not Stripe class. Bind in a provider. Tests bind a FakeGateway. This is SOLID’s D. Real example: SMS provider swap (Twilio vs MSG91).",
    code: `interface SmsSender {
    public function send(string $to, string $message): void;
}

$this->app->bind(SmsSender::class, Msg91Sender::class);`,
  },
  {
    id: "h5",
    category: "Architecture",
    level: "basic",
    kind: "conceptual",
    q: "MVC in Laravel — where does each piece live?",
    a: "Model: app/Models (data + relations). View: Blade/resources or JSON resources. Controller: HTTP layer. Extra: requests, policies, jobs, mail, events. config/ for configuration. database/migrations. routes/. Don’t put SQL in Blade or HTML in models.",
  },
  {
    id: "h6",
    category: "Architecture",
    level: "intermediate",
    kind: "conceptual",
    q: "Feature tests vs unit tests. What would you test for login?",
    a: "Feature tests hit HTTP: post('/login') and assert redirect/json + auth. Unit tests hit a single class with mocks. For 1 year: write feature tests for auth, validation 422, and one happy-path CRUD. php artisan test / pest. RefreshDatabase trait.",
    code: `public function test_admin_can_login(): void
{
    $user = User::factory()->create(['password' => 'secret123']);

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'secret123',
    ])->assertRedirect('/dashboard');

    $this->assertAuthenticatedAs($user);
}`,
  },

  // ─── Coding Problems ──────────────────────────────────────
  {
    id: "d1",
    category: "Coding Problems",
    level: "basic",
    kind: "coding",
    q: "CRUD: store a Post from a validated request (safe mass assignment).",
    a: "Use Form Request + create(validated).",
    code: `public function store(StorePostRequest $request)
{
    $post = Post::create($request->validated() + [
        'user_id' => $request->user()->id,
    ]);

    return redirect()->route('posts.show', $post);
}`,
  },
  {
    id: "d2",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Fix this N+1 and add search + pagination.",
    a: "Eager load, where like on indexed-enough columns, paginate.",
    code: `public function index(Request $request)
{
    $q = $request->string('search');

    $students = Student::query()
        ->with('school:id,name')
        ->when($q->isNotEmpty(), function ($query) use ($q) {
            $query->where(function ($inner) use ($q) {
                $inner->where('name', 'like', "%{$q}%")
                    ->orWhere('email', 'like', "%{$q}%")
                    ->orWhere('admission_number', 'like', "%{$q}%");
            });
        })
        ->latest()
        ->paginate(20)
        ->withQueryString();

    return view('admin.students.index', compact('students'));
}`,
  },
  {
    id: "d3",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Upload a student photo to storage and save the path.",
    a: "Validate mime/size. store() on the public disk. Never trust client filenames blindly.",
    code: `public function updatePhoto(Request $request, Student $student)
{
    $request->validate([
        'photo' => ['required', 'image', 'max:2048'],
    ]);

    $path = $request->file('photo')->store('students', 'public');
    $student->update(['photo' => $path]);

    return back();
}

// asset: Storage::url($student->photo)  // /storage/students/...`,
  },
  {
    id: "d4",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Bulk assign grade to selected student ids, scoped to the admin’s school.",
    a: "Validate ids exist in that school. Update in one query. Don’t trust client-sent school_id.",
    code: `public function batchUpdate(Request $request)
{
    $data = $request->validate([
        'grade' => ['required', 'string', 'max:50'],
        'student_ids' => ['required', 'array', 'min:1'],
        'student_ids.*' => ['integer'],
    ]);

    $count = Student::query()
        ->where('school_id', $request->user()->school_id)
        ->whereIn('id', $data['student_ids'])
        ->update(['grade' => $data['grade']]);

    return back()->with('success', "Updated {$count} students.");
}`,
  },
  {
    id: "d5",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Write an Eloquent query: last 7 days’ exam attempts per student with attempt count.",
    a: "withCount + where on relation date.",
    code: `Student::query()
    ->withCount(['attempts as week_attempts' => function ($q) {
        $q->where('created_at', '>=', now()->subDays(7));
    }])
    ->having('week_attempts', '>', 0)
    ->orderByDesc('week_attempts')
    ->get();`,
  },
  {
    id: "d6",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Prevent double exam submit with a lock (race condition).",
    a: "Use unique constraint + catch duplicate, or lockForUpdate inside a transaction.",
    code: `DB::transaction(function () use ($examId, $studentId, $answers) {
    $attempt = ExamAttempt::where('exam_id', $examId)
        ->where('student_id', $studentId)
        ->lockForUpdate()
        ->firstOrFail();

    if ($attempt->submitted_at) {
        abort(409, 'Already submitted');
    }

    $attempt->update([
        'answers' => $answers,
        'submitted_at' => now(),
    ]);
});

// Also unique(exam_id, student_id) in migration`,
  },
  {
    id: "d7",
    category: "Coding Problems",
    level: "basic",
    kind: "coding",
    q: "Blade: show a list and a CSRF form. Escape output.",
    a: "{{ }} escapes. @csrf on POST forms. @forelse for empty state.",
    code: `@forelse ($students as $student)
    <li>{{ $student->name }}</li>
@empty
    <li>No students</li>
@endforelse

<form method="POST" action="{{ route('admin.students.store') }}">
    @csrf
    <input name="name" value="{{ old('name') }}">
    @error('name') <span>{{ $message }}</span> @enderror
    <button>Save</button>
</form>`,
  },
  {
    id: "d8",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "API login with Sanctum token.",
    a: "Validate credentials, Hash check or Auth::attempt, then createToken.",
    code: `public function login(Request $request)
{
    $data = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    $user = User::where('email', $data['email'])->first();

    if (!$user || !Hash::check($data['password'], $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['Invalid credentials.'],
        ]);
    }

    $token = $user->createToken('api')->plainTextToken;

    return response()->json(['token' => $token, 'user' => $user]);
}`,
  },
  {
    id: "d9",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Write a console command to close exams whose end_at has passed.",
    a: "make:command, handle(), schedule it.",
    code: `class CloseExpiredExams extends Command
{
    protected $signature = 'exams:close-expired';
    protected $description = 'Mark expired exams as closed';

    public function handle(): int
    {
        $n = Exam::query()
            ->where('status', 'live')
            ->where('end_at', '<', now())
            ->update(['status' => 'closed']);

        $this->info("Closed {$n} exams.");
        return self::SUCCESS;
    }
}`,
  },
  {
    id: "d10",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Many-to-many attach/sync/detach — assign roles without wiping extra pivots accidentally.",
    a: "attach adds, detach removes, sync replaces the whole set, syncWithoutDetaching adds missing. Prefer sync($ids) when the form sends the full role list.",
    code: `$user->roles()->sync([1, 2, 3]);
$user->roles()->attach(4, ['assigned_by' => auth()->id()]);
$user->roles()->detach(4);`,
  },
  {
    id: "d11",
    category: "Coding Problems",
    level: "basic",
    kind: "coding",
    q: "Tinker one-liners you should know.",
    a: "Quick debugging without writing a controller.",
    code: `php artisan tinker
User::count();
User::find(1)->toArray();
Hash::make('secret');
Student::where('school_id', 1)->pluck('email');
Cache::flush();`,
  },
  {
    id: "d12",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "HTTP client: call a downstream service with JWT and timeout.",
    a: "Use Http::timeout + throw + retry. Don’t ignore 5xx silently in a BFF.",
    code: `$response = Http::timeout(5)
    ->retry(2, 100)
    ->withToken($jwt)
    ->acceptJson()
    ->get(config('services.school.url').'/api/staff-requests');

$response->throw();
$data = $response->json();`,
  },
  {
    id: "d13",
    category: "Coding Problems",
    level: "intermediate",
    kind: "conceptual",
    q: "Livewire vs Blade vs API+Next — when for a Laravel backend person?",
    a: "Blade/Livewire: admin panels fast, same repo. API + separate frontend: mobile/SPA, multiple clients. You as backend still own validation, policies, DB, queues. Don’t say you ‘only write JSON’ if you ship Blade at work — both count.",
  },
  {
    id: "d14",
    category: "Coding Problems",
    level: "basic",
    kind: "conceptual",
    q: "What happens if you forget @csrf on a Blade POST form?",
    a: "419 Page Expired. VerifyCsrfToken rejects the request. For AJAX, send X-CSRF-TOKEN from <meta name='csrf-token'>. Login/logout must be POST/DELETE with CSRF, not GET.",
  },
  {
    id: "d15",
    category: "Coding Problems",
    level: "advanced",
    kind: "conceptual",
    q: "How do you handle file storage on multiple servers?",
    a: "Local disk is not shared across app nodes. Use S3/MinIO (FILESYSTEM_DISK=s3) or NFS. Store only the path in DB. Queue workers must use the same disk. Never git-commit uploaded files.",
  },
  {
    id: "d16",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Collection vs query: don’t load the whole table to filter in PHP.",
    a: "Filter in SQL. Collections are for in-memory lists already loaded.",
    code: `// Bad
User::all()->where('active', true);

// Good
User::where('active', true)->get();

// OK once loaded
$active = $users->where('active', true)->values();`,
  },
  {
    id: "d17",
    category: "Coding Problems",
    level: "basic",
    kind: "conceptual",
    q: "Named routes vs hardcoded /admin/students urls.",
    a: "route('admin.students.index') survives URL changes. old(), redirect()->route(), Blade all use names. Always name routes in groups with ->name('admin.').",
  },
  {
    id: "d18",
    category: "Coding Problems",
    level: "advanced",
    kind: "conceptual",
    q: "Zero-downtime migrate: adding a column used by new code.",
    a: "Expand/contract: 1) deploy migration that adds nullable column. 2) deploy code that writes the column. 3) backfill. 4) make NOT NULL if needed. Dropping columns / renaming is dangerous while old workers still run. queue:restart after deploy. Avoid migrate:refresh on production.",
  },
  {
    id: "d19",
    category: "Coding Problems",
    level: "intermediate",
    kind: "conceptual",
    q: "What is eager loading constraint vs lazy eager load?",
    a: "with(['comments' => fn ($q) => $q->where('approved', true)]). load('comments') on an already-fetched collection is lazy eager loading (still 1 extra query, not N). Useful after you decide you need the relation.",
  },
  {
    id: "d20",
    category: "Coding Problems",
    level: "basic",
    kind: "conceptual",
    q: "Difference between PUT, PATCH, and POST in Laravel controllers.",
    a: "POST create. PUT replace full resource (or Laravel method spoofing _method=PUT from forms). PATCH partial update. HTML forms only GET/POST so we @method('PUT'). APIs can send real verbs.",
  },

  // ─── Laravel Core (deeper) ────────────────────────────────
  {
    id: "c11",
    category: "Laravel Core",
    level: "advanced",
    kind: "conceptual",
    q: "bind vs singleton vs instance vs contextual binding — exact difference?",
    a: "bind(): every resolve() creates a new object. singleton(): first resolve is cached for the rest of the request. instance(): you hand Laravel an already-built object. contextual: ‘when ControllerA needs SmsSender, give Twilio; when ControllerB needs it, give Msg91’. Interviewers want: singleton is per-request, not process-wide (unless Octane). Don’t store request state on a singleton.",
    code: `$this->app->bind(ReportBuilder::class);
$this->app->singleton(InvoiceNumber::class);
$this->app->instance('school', $school);

$this->app->when(OtpController::class)
    ->needs(SmsSender::class)
    ->give(Msg91Sender::class);`,
  },
  {
    id: "c12",
    category: "Laravel Core",
    level: "advanced",
    kind: "conceptual",
    q: "What actually happens when you type-hint a class in a controller constructor?",
    a: "The HTTP kernel asks the container to build the controller. Container reads the constructor via Reflection, recursively resolves each type-hint, and injects them. If an interface has no binding, it throws BindingResolutionException. Primitive parameters need default values or contextual binding. Method injection on controller actions works the same (Request is always injected).",
  },
  {
    id: "c13",
    category: "Laravel Core",
    level: "intermediate",
    kind: "coding",
    q: "Write a Collection/Response/Str macro. When is a macro better than a helper?",
    a: "Macros extend framework classes without forking. Register in a service provider boot(). Prefer a dedicated class if logic is big; macros are for small reusable API sugar.",
    code: `use Illuminate\\Support\\Collection;
use Illuminate\\Support\\ServiceProvider;

class MacroServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Collection::macro('toUpper', function () {
            return $this->map(fn ($v) => is_string($v) ? strtoupper($v) : $v);
        });
    }
}

collect(['php', 'laravel'])->toUpper(); // ['PHP', 'LARAVEL']`,
  },
  {
    id: "c14",
    category: "Laravel Core",
    level: "advanced",
    kind: "conceptual",
    q: "Laravel Pipeline — what is it and where is it used internally?",
    a: "Pipeline sends an object through an array of classes (like middleware). HTTP Kernel IS a pipeline of middleware. You can reuse it for transforming a DTO: pipes that sanitize, authorize, persist. Each pipe: handle($passable, $next). This is the same pattern as onion middleware.",
    code: `use Illuminate\\Pipeline\\Pipeline;

$user = app(Pipeline::class)
    ->send($request->all())
    ->through([
        NormalizeEmail::class,
        HashPassword::class,
        CreateUser::class,
    ])
    ->thenReturn();`,
  },
  {
    id: "c15",
    category: "Laravel Core",
    level: "intermediate",
    kind: "conceptual",
    q: "Contracts vs Facades. Why does Laravel have Illuminate\\Contracts\\*? ",
    a: "Contracts are interfaces (Cache, Queue, Mailer). Facades resolve those from the container. If you type-hint CacheRepository instead of using Cache::, tests can bind a fake. Package authors depend on contracts so they don’t couple to a concrete Redis store. In day-to-day app code, facades are fine; in packages/services, prefer contracts.",
  },
  {
    id: "c16",
    category: "Laravel Core",
    level: "advanced",
    kind: "conceptual",
    q: "What is deferred service provider? Laravel 11 bootstrap/providers.php?",
    a: "Deferred providers load only when something they provide is resolved — faster boot. You implement DeferrableProvider and provides(). Laravel 11 moved default providers to bootstrap/providers.php and slimmed Kernel. Still the same idea: don’t boot Mail/Scout on every health-check request if unused. For 1y exp: know WHERE providers are listed and that boot order matters.",
  },
  {
    id: "c17",
    category: "Laravel Core",
    level: "intermediate",
    kind: "conceptual",
    q: "config:cache pitfall with env() in a controller — walk through the bug.",
    a: "You wrote env('FEATURE_X') in a controller. Locally it works. Production runs config:cache. After cache, env() outside config files returns null, so the feature looks off. Fix: put env() only in config/features.php and call config('features.x'). Deploy must run config:cache AFTER copying .env. Never commit .env.",
  },
  {
    id: "c18",
    category: "Laravel Core",
    level: "advanced",
    kind: "conceptual",
    q: "Octane (Swoole/RoadRunner) — what Laravel habits break?",
    a: "Workers stay alive across requests. Static properties, singletons holding Request/User, and memory leaks persist. Don’t use static $cache = [] on a class for ‘this request’. Config is loaded once — config:clear doesn’t apply until restart. Uploaded files / DB connections must be reset. For most 1y jobs you won’t run Octane, but saying ‘state leaks across requests’ scores points.",
  },
  {
    id: "c19",
    category: "Laravel Core",
    level: "basic",
    kind: "conceptual",
    q: "Difference between php artisan serve vs nginx+php-fpm.",
    a: "serve is PHP’s built-in server for local only — single-threaded-ish, no real process manager. Production: nginx receives HTTP, php-fpm runs PHP workers, opcache on, APP_DEBUG=false. Queue workers are SEPARATE processes. Interview: never ‘deploy with artisan serve’.",
  },
  {
    id: "c20",
    category: "Laravel Core",
    level: "intermediate",
    kind: "coding",
    q: "Write a custom Artisan command that accepts {school} and --dry-run.",
    a: "signature arguments vs options. Return SUCCESS/FAILURE for CI.",
    code: `protected $signature = 'students:archive {school : School id} {--dry-run}';

public function handle(): int
{
    $query = Student::where('school_id', $this->argument('school'))
        ->where('updated_at', '<', now()->subYear());

    if ($this->option('dry-run')) {
        $this->info('Would archive '.$query->count());
        return self::SUCCESS;
    }

    $n = $query->update(['archived_at' => now()]);
    $this->info("Archived {$n}");
    return self::SUCCESS;
}`,
  },

  // ─── Routing deeper ───────────────────────────────────────
  {
    id: "r9",
    category: "Routing & Middleware",
    level: "advanced",
    kind: "conceptual",
    q: "Scoped bindings: /schools/{school}/students/{student} — how do you prevent IDOR?",
    a: "Without scoped bindings, /schools/1/students/99 can load student 99 even if they belong to school 2. scoped() / Route::scopeBindings() makes {student} resolve only where student.school_id = school.id. ALSO authorize in policy. Never trust the URL school id alone — compare with auth()->user()->school_id.",
    code: `Route::scopeBindings()->group(function () {
    Route::get('/schools/{school}/students/{student}', [StudentController::class, 'show']);
});

// Student model
public function school() { return $this->belongsTo(School::class); }`,
  },
  {
    id: "r10",
    category: "Routing & Middleware",
    level: "intermediate",
    kind: "conceptual",
    q: "SubstituteBindings middleware — why 404 instead of null?",
    a: "Implicit binding uses findOrFail on the route key. Missing model → ModelNotFoundException → 404. That’s correct for REST. If you used find(), you’d have to abort yourself. Custom bind can firstOrFail() or abort(403) if the user must not know it exists (avoid leaking ‘this id exists’).",
  },
  {
    id: "r11",
    category: "Routing & Middleware",
    level: "advanced",
    kind: "conceptual",
    q: "Middleware priority. Where do you put ‘set locale’ vs ‘auth’?",
    a: "Order is the onion: global → group → route. Request flows in, response flows out reverse. Auth must run before role middleware. Locale can run early so validation messages are translated. TrimStrings/ConvertEmptyStringsToNull run before controllers so '' becomes null. Don’t put DB writes in middleware unless you know it runs once (not on every aborted request).",
  },
  {
    id: "r12",
    category: "Routing & Middleware",
    level: "intermediate",
    kind: "coding",
    q: "Signed URL for ‘verify email / download report’ that expires in 30 minutes.",
    a: "URL::temporarySignedRoute. hasValidSignature() / ValidateSignature middleware. Don’t put secrets in the query; signature is HMAC of url+expiry using APP_KEY.",
    code: `$url = URL::temporarySignedRoute(
    'reports.download',
    now()->addMinutes(30),
    ['report' => $report->id]
);

Route::get('/reports/{report}/download', [ReportController::class, 'download'])
    ->name('reports.download')
    ->middleware('signed');`,
  },
  {
    id: "r13",
    category: "Routing & Middleware",
    level: "advanced",
    kind: "conceptual",
    q: "route:cache — what CANNOT be cached?",
    a: "Closures in routes/*.php cannot be cached. All routes must point to controller@method. That’s why production uses controllers. If route:cache fails, you still have a closure somewhere (including package). Fallback routes and some wildcard patterns also need care.",
  },
  {
    id: "r14",
    category: "Routing & Middleware",
    level: "intermediate",
    kind: "coding",
    q: "Rate-limit API: 60/min per user, 10/min per IP for guests.",
    a: "RateLimiter::for in AppServiceProvider / RouteServiceProvider.",
    code: `RateLimiter::for('api', function (Request $request) {
    return $request->user()
        ? Limit::perMinute(60)->by('user:'.$request->user()->id)
        : Limit::perMinute(10)->by('ip:'.$request->ip());
});

Route::middleware('throttle:api')->group(...);`,
  },
  {
    id: "r15",
    category: "Routing & Middleware",
    level: "basic",
    kind: "conceptual",
    q: "What is a fallback route and when do you use it?",
    a: "Route::fallback() catches unmatched URLs — custom 404 JSON for APIs instead of HTML. Must be registered last. Don’t use it as a ‘catch all controller’ for real pages; that’s a routing smell.",
  },

  // ─── Eloquent deeper ──────────────────────────────────────
  {
    id: "e19",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "isDirty / wasChanged / getOriginal / getChanges — when debugging ‘model didn’t save’.",
    a: "isDirty('email') true if attribute changed in memory but not yet saved. wasChanged('email') true AFTER save if that column actually updated. getOriginal('email') is the DB value at load time. If update() affects 0 rows, maybe no real change, wrong id, or $fillable blocked it. $user->save() vs $user->update($arr) — update also runs fill() + save.",
    code: `$user->email = 'new@x.com';
$user->isDirty('email');      // true
$user->save();
$user->wasChanged('email');   // true
$user->getChanges();          // ['email' => ...]`,
  },
  {
    id: "e20",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "Why does $user->save() not update updated_at / not fire events sometimes?",
    a: "If nothing is dirty, Eloquent skips UPDATE. timestamps false on model. save(['timestamps' => false]). Events: withoutEvents(), or update() on a query builder (User::where->update()) bypasses model events/observers. That’s a classic bug: bulk update doesn’t send ‘user updated’ listener. Mass update ≠ $model->update().",
  },
  {
    id: "e21",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "Global scopes — power and the footgun.",
    a: "A global scope (SoftDeletes is one) applies to EVERY query on that model. Easy to forget and ‘lose’ rows. withoutGlobalScope(ActiveScope::class) or withoutGlobalScopes(). Adding a TenantScope that forces school_id is excellent for multi-tenant IF auth is available; in queues/jobs there may be no user — scope must not break artisan commands. Test console + jobs without HTTP.",
    code: `class TenantScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        if ($schoolId = auth()->user()?->school_id) {
            $builder->where($model->qualifyColumn('school_id'), $schoolId);
        }
    }
}`,
  },
  {
    id: "e22",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "hasOneThrough / hasManyThrough — students via classrooms for a school.",
    a: "When A has many B, B has many C, and you want A→C without a direct FK.",
    code: `// School hasMany Classroom; Classroom hasMany Student
public function students()
{
    return $this->hasManyThrough(Student::class, Classroom::class);
}`,
  },
  {
    id: "e23",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "whereHas vs with vs join — performance truth.",
    a: "with() is extra IN (...) queries (usually 2 queries) — best default. whereHas() adds EXISTS subquery — filters parents that have children; can be slow without indexes on FKs. join() can duplicate parent rows (need distinct/groupBy). Don’t join just to eager load. For ‘students with exams’, whereHas to filter + with('exams') to load.",
    code: `Student::query()
    ->whereHas('exams', fn ($q) => $q->where('status', 'live'))
    ->with(['exams' => fn ($q) => $q->where('status', 'live')])
    ->get();`,
  },
  {
    id: "e24",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "lockForUpdate vs sharedLock vs unique constraint for race conditions.",
    a: "lockForUpdate() (SELECT ... FOR UPDATE) inside a transaction serializes rows — two exam submits: second waits, then sees submitted_at. Requires InnoDB and same DB connection. Unique (exam_id, student_id) is the real safety net if a lock is forgotten. Optimistic locking: version column, update where version=old. Deadlocks: keep transactions short, always lock rows in the same order.",
  },
  {
    id: "e25",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "upsert a list of students by (school_id, email).",
    a: "MySQL unique index required. timestamps optional.",
    code: `Student::upsert(
    [
        ['school_id' => 1, 'email' => 'a@x.com', 'name' => 'A', 'grade' => '10'],
        ['school_id' => 1, 'email' => 'b@x.com', 'name' => 'B', 'grade' => '10'],
    ],
    uniqueBy: ['school_id', 'email'],
    update: ['name', 'grade']
);`,
  },
  {
    id: "e26",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "Custom casts / value objects. Example: Money or Enum.",
    a: "PHP 8.1 enums + $casts = ['status' => ExamStatus::class]. Custom Casts: Implements CastsAttributes. Don’t store money as float — integer paise or decimal cast. Encrypted cast uses APP_KEY; rotating key without decrypting first bricks data.",
    code: `protected $casts = [
    'status' => ExamStatus::class, // enum
    'settings' => 'array',
    'salary' => 'decimal:2',
    'secret' => 'encrypted',
];`,
  },
  {
    id: "e27",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "replicate(), clone, and copying a model with relations.",
    a: "replicate() copies attributes except pk/timestamps; you set new unique fields then save. Relations are NOT copied automatically. For ‘duplicate exam with questions’, replicate exam then map questions in a transaction. Don’t copy hidden secrets.",
    code: `DB::transaction(function () use ($exam) {
    $copy = $exam->replicate();
    $copy->title = $exam->title.' (copy)';
    $copy->save();
    foreach ($exam->questions as $q) {
        $copy->questions()->save($q->replicate());
    }
});`,
  },
  {
    id: "e28",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "EXPLAIN a slow query. What do you look for?",
    a: "type: ALL = full table scan (bad on large tables). Extra: Using filesort / Using temporary. key: null means no index used. possible_keys vs key. Cardinality. Fix: add composite index matching WHERE + ORDER BY, avoid LIKE '%x%', avoid functions on column (YEAR(created_at)), select fewer columns, paginate. Laravel: ->toSql() + getBindings(), enable query log, Telescope.",
  },
  {
    id: "e29",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "coding",
    q: "Subquery select: students + last exam date without N+1.",
    a: "addSelect subquery or withMax.",
    code: `Student::query()
    ->withMax('attempts as last_attempt_at', 'created_at')
    ->get();

// or
Student::query()->addSelect([
    'last_attempt_at' => ExamAttempt::select('created_at')
        ->whereColumn('student_id', 'students.id')
        ->latest()
        ->limit(1),
])->get();`,
  },
  {
    id: "e30",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "conceptual",
    q: "MySQL JSON columns vs a related table. When?",
    a: "JSON is fine for unstructured settings (theme, flags) you rarely query. If you filter/sort by a field, make a real column/index. JSON path indexes exist but are harder. Don’t dump huge exam answer blobs without thinking about row size and backups. Eloquent array/json cast is convenience, not a document DB.",
  },
  {
    id: "e31",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "FK onDelete cascade vs restrict vs set null. SoftDeletes + FK.",
    a: "cascade: delete children. restrict: prevent parent delete. set null: orphan allowed. Soft delete does NOT trigger SQL ON DELETE because the row stays. You must handle children in deleting observer or they remain ‘active’. Unique email + soft delete: use unique (email, deleted_at) or a ‘deleted’ suffix strategy.",
  },
  {
    id: "e32",
    category: "Eloquent & Database",
    level: "basic",
    kind: "coding",
    q: "Write belongsToMany with extra pivot fields and query them.",
    a: "withPivot, wherePivot, using a custom Pivot model if logic grows.",
    code: `$student->exams()->attach($examId, ['score' => 90, 'attempt' => 1]);

$student->exams()
    ->wherePivot('score', '>=', 40)
    ->get();

echo $student->exams->first()->pivot->score;`,
  },
  {
    id: "e33",
    category: "Eloquent & Database",
    level: "advanced",
    kind: "coding",
    q: "Fix: foreach User::all() as $user { $user->notify(); } for 50k users.",
    a: "Don’t load 50k models. chunkById + queued notifications. Or Notification::send() with a query / lazy collection. Memory and timeout will kill the request.",
    code: `User::query()->where('notify', true)->chunkById(200, function ($users) {
    Notification::send($users, new WeeklyDigest());
});

// even better: a job per chunk
User::query()->where('notify', true)
    ->lazyById()
    ->each(fn (User $u) => $u->notify((new WeeklyDigest())->delay(now()->addSeconds(5))));`,
  },
  {
    id: "e34",
    category: "Eloquent & Database",
    level: "intermediate",
    kind: "conceptual",
    q: "fresh() vs refresh() vs load() vs replicate().",
    a: "fresh() returns a NEW instance from DB. refresh() reloads THIS instance in place (loses unsaved dirty attrs). load() eager-loads relations on current instance. replicate() copies attributes to a new unsaved model. Mixing these up causes ‘I updated but the relation still shows old data’.",
  },

  // ─── Validation deeper ────────────────────────────────────
  {
    id: "v6",
    category: "Validation & Requests",
    level: "advanced",
    kind: "conceptual",
    q: "sometimes vs required_if vs exclude_if. Give a real form example.",
    a: "sometimes: validate only if the key is present (PATCH partial). required_if:status,published title is required when publishing. exclude_if: drop the field from validated() so it never gets saved (password empty on profile update). nullable allows null but not missing depending on required. This is where 1y candidates fail PATCH APIs.",
    code: `'email' => ['sometimes', 'email', Rule::unique('users')->ignore($this->user())],
'password' => ['nullable', 'min:8', 'confirmed'],
'title' => ['required_if:status,published', 'string', 'max:255'],`,
  },
  {
    id: "v7",
    category: "Validation & Requests",
    level: "advanced",
    kind: "coding",
    q: "Array validation: questions[].type in mcq|numeric, options required if mcq.",
    a: "Dot notation + Rule::requiredIf.",
    code: `'questions' => ['required', 'array', 'min:1'],
'questions.*.body' => ['required', 'string'],
'questions.*.type' => ['required', Rule::in(['mcq', 'numeric'])],
'questions.*.options' => ['required_if:questions.*.type,mcq', 'array', 'min:2'],
'questions.*.options.*' => ['string', 'max:255'],
'questions.*.answer' => ['required'],`,
  },
  {
    id: "v8",
    category: "Validation & Requests",
    level: "intermediate",
    kind: "conceptual",
    q: "after() / withValidator() for rules that need DB context.",
    a: "When a rule depends on two fields plus a query: ‘exam end must be after start AND not overlap another live exam in this school’. You can’t express overlap easily in a single rule string. Use after() to add errors. Keep it in FormRequest not controller.",
    code: `public function withValidator($validator): void
{
    $validator->after(function ($validator) {
        $overlap = Exam::where('school_id', $this->user()->school_id)
            ->where('id', '!=', $this->route('exam')?->id)
            ->where('start_at', '<', $this->end_at)
            ->where('end_at', '>', $this->start_at)
            ->exists();
        if ($overlap) {
            $validator->errors()->add('start_at', 'Overlaps another exam.');
        }
    });
}`,
  },
  {
    id: "v9",
    category: "Validation & Requests",
    level: "intermediate",
    kind: "conceptual",
    q: "ValidationException → 422 JSON vs redirect. How does Laravel decide?",
    a: "If the request expects JSON (Accept: application/json or wantsJson(), typically /api), Laravel returns 422 JSON errors. Web requests redirect back with errors in session. That’s why your SPA must send Accept: application/json or you’ll get a 302 to login HTML. ForceJson on API middleware helps.",
  },
  {
    id: "v10",
    category: "Validation & Requests",
    level: "advanced",
    kind: "conceptual",
    q: "Password::defaults() and uncompromised(). Why min:8 is not enough.",
    a: "Laravel Password rule: mixedCase, numbers, symbols, uncompromised() checks Have I Been Pwned k-anonymity API. For school students you might keep simpler rules; for admin/staff use strong defaults. Never max password length too small (bcrypt 72 bytes). Hash in the model cast, not in the request.",
  },

  // ─── Auth deeper ──────────────────────────────────────────
  {
    id: "a9",
    category: "Auth & Security",
    level: "advanced",
    kind: "conceptual",
    q: "Multi-guard: admin, student, superadmin. How does Auth::guard work?",
    a: "config/auth.php: guards (session/sanctum/jwt) + providers (eloquent model). auth('admin')->user() is a different session key than auth('student'). Mixing guards is a classic bug: you check Auth::check() (default web) on an admin route. Middleware auth:admin. Policies receive the guard’s user. Don’t use one users table with role only if passwords/reset flows differ a lot — separate models is valid (Admin, Student).",
  },
  {
    id: "a10",
    category: "Auth & Security",
    level: "advanced",
    kind: "conceptual",
    q: "Session fixation, regenerate, logout other devices.",
    a: "After login, $request->session()->regenerate() (Auth::attempt does this in Laravel). Session fixation: attacker sets your session id before login. logoutOtherDevices($password) invalidates other remember tokens. Sanctum: delete tokens. JWT: denylist jti. Always regenerate on privilege change (login, password reset).",
  },
  {
    id: "a11",
    category: "Auth & Security",
    level: "intermediate",
    kind: "conceptual",
    q: "remember_token vs Sanctum personal access token vs JWT.",
    a: "remember_token: long-lived cookie login for Blade. PAT: hashed in personal_access_tokens, revocable, abilities[]. JWT: self-contained, no DB by default, hard to revoke. For first-party SPA: Sanctum cookie. For mobile: Sanctum token or JWT. For microservices: JWT with shared JWKS/secret and short TTL.",
  },
  {
    id: "a12",
    category: "Auth & Security",
    level: "advanced",
    kind: "coding",
    q: "Policy + Gate::before for superadmin bypass. Why is Gate::before dangerous?",
    a: "before() returning true authorizes EVERYTHING. Use only for a real superadmin. Returning null falls through to the policy. Returning false is deny-all.",
    code: `Gate::before(function (User $user, string $ability) {
    if ($user->is_superadmin) {
        return true;
    }
    return null;
});`,
  },
  {
    id: "a13",
    category: "Auth & Security",
    level: "advanced",
    kind: "conceptual",
    q: "Mass assignment + $request->all() + is_admin field. Walk the exploit.",
    a: "User model $fillable includes is_admin OR $guarded = []. Attacker POSTs is_admin=1 with registration. Eloquent sets it. Fix: never all(); validated() without is_admin; $fillable without is_admin; authorize; DB default 0; separate role table. Same bug with school_id: student sets another school_id and escapes tenant.",
  },
  {
    id: "a14",
    category: "Auth & Security",
    level: "intermediate",
    kind: "coding",
    q: "Force password change flag: middleware that blocks all routes except the change form.",
    a: "Typical first-login flow.",
    code: `public function handle(Request $request, Closure $next)
{
    $user = $request->user();
    if ($user?->must_change_password && ! $request->routeIs('password.force.*')) {
        return redirect()->route('password.force.edit');
    }
    return $next($request);
}`,
  },
  {
    id: "a15",
    category: "Auth & Security",
    level: "advanced",
    kind: "conceptual",
    q: "Timing attacks on login. Does Laravel protect you?",
    a: "Hash::check is designed to be constant-time for the hash compare. Still: don’t ‘if user exists then check password’ with different response times/messages if you care about enumeration — use the same error ‘invalid credentials’. Rate-limit by IP + email. Add generic 422. OTP flows need attempt limits too.",
  },
  {
    id: "a16",
    category: "Auth & Security",
    level: "intermediate",
    kind: "conceptual",
    q: "APP_KEY leaked. What do you rotate and what breaks?",
    a: "Cookies, encrypted casts, signed URLs, password reset tokens, Sanctum encrypt cookies. Generate new key, re-encrypt data if you used Crypt/encrypted casts (Laravel has encryption key rotation patterns). Sessions die. Tell users to log in again. Never reuse APP_KEY across staging/prod.",
  },

  // ─── APIs deeper ──────────────────────────────────────────
  {
    id: "p8",
    category: "APIs",
    level: "advanced",
    kind: "conceptual",
    q: "What belongs in an API Resource vs the model vs a transformer service?",
    a: "Model: data + relations + domain helpers. Resource: HTTP shape, hide fields, whenLoaded to avoid N+1 surprises, wrap pagination. If many clients need different shapes, multiple resources (AdminStudentResource vs StudentSelfResource) not if/else on role inside one resource forever. Don’t put queries in toArray() — that hides N+1.",
  },
  {
    id: "p9",
    category: "APIs",
    level: "advanced",
    kind: "coding",
    q: "Consistent error JSON for 422/401/403/500. Where?",
    a: "bootstrap/app.php exception rendering (L11) or Handler::render. Don’t leak $e->getMessage() in production 500s.",
    code: `// Handler.php (simplified)
public function render($request, Throwable $e)
{
    if ($request->expectsJson()) {
        if ($e instanceof ValidationException) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
        if ($e instanceof AuthenticationException) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
    }
    return parent::render($request, $e);
}`,
  },
  {
    id: "p10",
    category: "APIs",
    level: "intermediate",
    kind: "conceptual",
    q: "Pagination: page vs cursor. When does offset die?",
    a: "page=5000 with 20 per page does OFFSET 100000 — MySQL still scans/skips those rows. Cursor pagination (Laravel cursorPaginate) uses WHERE id > last and is stable for infinite scroll. Offset is fine for admin pages 1–20. For feeds/logs, cursor. Always index the cursor column.",
  },
  {
    id: "p11",
    category: "APIs",
    level: "advanced",
    kind: "conceptual",
    q: "Idempotency key implementation sketch for POST /payments.",
    a: "Client sends Idempotency-Key header (UUID). Server stores hash(key) → response code/body for 24h in Redis/DB unique. Same key + same payload → replay response. Same key + different payload → 409. Unique index prevents double insert under race. Combine with unique business key (order_id).",
  },
  {
    id: "p12",
    category: "APIs",
    level: "intermediate",
    kind: "coding",
    q: "API filter/sort whitelist — never take orderBy from user freely.",
    a: "SQL injection / data leak via sort=password. Whitelist columns.",
    code: `$sort = in_array($request->query('sort'), ['name', 'created_at', 'grade'], true)
    ? $request->query('sort')
    : 'created_at';
$dir = $request->query('dir') === 'asc' ? 'asc' : 'desc';

Student::orderBy($sort, $dir)->paginate();`,
  },
  {
    id: "p13",
    category: "APIs",
    level: "advanced",
    kind: "conceptual",
    q: "Forwarding JWT from BFF to downstream. Timeouts, retries, which errors to retry?",
    a: "Retry 429/502/503 on GET (idempotent). Do NOT retry POST payment without idempotency. Timeout < user wait (3–5s). Circuit breaker optional. Pass Authorization, X-Request-Id. Don’t log full tokens. Map downstream 401 to 401, 404 to 404, 500 to 502 Bad Gateway so clients don’t think BFF itself crashed domain logic.",
  },

  // ─── Queues deeper ────────────────────────────────────────
  {
    id: "q6",
    category: "Queues, Events & Jobs",
    level: "advanced",
    kind: "conceptual",
    q: "SerializesModels on jobs. Why pass id not the whole request array of files?",
    a: "Job is serialized to the queue. Eloquent models are stored as id+class and re-fetched on handle() — so you get fresh data. Unserializable things (closures, uploaded File) break. Huge arrays bloat Redis. If the model is deleted before the job runs, it throws ModelNotFoundException — decide retry vs fail. Pass ids, reload, check existence.",
  },
  {
    id: "q7",
    category: "Queues, Events & Jobs",
    level: "advanced",
    kind: "coding",
    q: "Job batch: import 10k students, then email admin when all done.",
    a: "Bus::batch, then(), allowFailures optional.",
    code: `use Illuminate\\Support\\Facades\\Bus;

$jobs = $chunks->map(fn ($rows) => new ImportStudentChunk($schoolId, $rows));

Bus::batch($jobs)
    ->then(fn () => Mail::to($admin)->send(new ImportDoneMail($schoolId)))
    ->catch(fn ($b, $e) => Log::error('import failed', ['e' => $e->getMessage()]))
    ->name('import-students-'.$schoolId)
    ->dispatch();`,
  },
  {
    id: "q8",
    category: "Queues, Events & Jobs",
    level: "advanced",
    kind: "conceptual",
    q: "Job chaining vs batch vs bus::chain vs shouldBeUnique.",
    a: "chain: A then B then C, stop on fail. batch: many parallel, callback when all finish. unique: only one ‘rebuild-report-school-5’ at a time (cache lock). Without unique, 10 clicks enqueue 10 heavy reports. Use ShouldBeUnique + uniqueId(). Unique lock TTL must outlive the job.",
    code: `public function uniqueId(): string
{
    return 'rebuild-report-'.$this->schoolId;
}`,
  },
  {
    id: "q9",
    category: "Queues, Events & Jobs",
    level: "intermediate",
    kind: "conceptual",
    q: "Why queue:restart after deploy? What is --once vs --stop-when-empty?",
    a: "Workers keep old PHP classes in memory. queue:restart sends a restart signal after current job. Without it, production runs yesterday’s code. --once for cron-based workers. horizon:terminate in deploy script. Always the same: deploy code → migrate → restart workers.",
  },
  {
    id: "q10",
    category: "Queues, Events & Jobs",
    level: "advanced",
    kind: "conceptual",
    q: "Poison message / job that always throws. What happens?",
    a: "Worker retries $tries times then moves to failed_jobs. If you set tries high and timeout short, the worker can crash (timeout) without incrementing tries correctly — Horizon/timeout config matters. Fix the bug, queue:retry id. Don’t $tries = 999 on mail to a bad address. Check failed() hook to alert Slack.",
  },
  {
    id: "q11",
    category: "Queues, Events & Jobs",
    level: "intermediate",
    kind: "coding",
    q: "Event subscriber vs listener. ShouldQueue on listener.",
    a: "Listener implements ShouldQueue to async. Don’t ShouldQueue the event itself. If the listener MUST run in the same request (DB consistency), keep it sync and dispatch a job from it for email only.",
    code: `class ExamSubmitted
{
    public function __construct(public ExamAttempt $attempt) {}
}

class SendResultEmail implements ShouldQueue
{
    public function handle(ExamSubmitted $event): void
    {
        Mail::to($event->attempt->student)->send(new ResultMail($event->attempt));
    }
}`,
  },
  {
    id: "q12",
    category: "Queues, Events & Jobs",
    level: "advanced",
    kind: "conceptual",
    q: "Notifications: via() channels, database vs mail vs broadcast. Queue them?",
    a: "toMail, toArray (db), toBroadcast. ShouldQueue on the notification class. Database notifications power the bell icon. Don’t send 4 channels if user disabled email. Prefer notify() on Notifiable model. For SMS, a dedicated channel class. Rate-limit OTP notifications.",
  },

  // ─── Cache deeper ─────────────────────────────────────────
  {
    id: "k6",
    category: "Caching & Performance",
    level: "advanced",
    kind: "conceptual",
    q: "Cache stampede (thundering herd) on exam list at 9:00 AM.",
    a: "TTL expires, 2000 students hit DB together. Mitigations: longer TTL + random jitter, Cache::lock so one request rebuilds, stale-while-revalidate (serve old, rebuild in job), pre-warm at 8:55 with a scheduler. Key design: school:{id}:exams:live. Don’t cache empty error responses forever.",
  },
  {
    id: "k7",
    category: "Caching & Performance",
    level: "advanced",
    kind: "coding",
    q: "Atomic increment of ‘remaining seats’ with Redis vs SQL.",
    a: "SQL: decrement in transaction WHERE seats > 0, check affected rows. Redis: DECR, if < 0 INCR back (or Lua). SQL is source of truth for money/seats; Redis is for speed. Hybrid: SQL authoritative, Redis cache of count.",
    code: `$updated = Exam::where('id', $id)
    ->where('seats_left', '>', 0)
    ->decrement('seats_left');

if ($updated === 0) {
    abort(409, 'Full');
}`,
  },
  {
    id: "k8",
    category: "Caching & Performance",
    level: "intermediate",
    kind: "conceptual",
    q: "OPcache, config cache, query cache — three different layers.",
    a: "OPcache: compiled PHP in memory (php.ini) — biggest prod win. Laravel config/route/view cache: framework bootstrap. Redis/data cache: your Cache::remember. MySQL query cache is removed/disabled in modern MySQL — don’t rely on it. Say this clearly so you don’t mix them.",
  },
  {
    id: "k9",
    category: "Caching & Performance",
    level: "advanced",
    kind: "conceptual",
    q: "N+1 in API Resources with whenLoaded. How do you enforce it?",
    a: "Model::preventLazyLoading() in local/staging. In production you may log instead of throw. Resource whenLoaded('school') omits key if you forgot with('school') — better than 500 queries. Tests: assert that a listing endpoint runs <= 5 queries (assertQueryCount if you add a helper / Telescope / DB::listen).",
  },
  {
    id: "k10",
    category: "Caching & Performance",
    level: "intermediate",
    kind: "coding",
    q: "Cache tags — when they don’t work.",
    a: "file and database cache drivers do NOT support tags. Redis/Memcached do. If you use file driver locally and tags in prod, APIs differ. Prefer key prefixes school:5:* and forget by known keys if you must stay driver-agnostic.",
    code: `Cache::tags(['school:5', 'exams'])->remember('list', 600, fn () => ...);
Cache::tags(['school:5'])->flush();`,
  },

  // ─── Architecture deeper ──────────────────────────────────
  {
    id: "h7",
    category: "Architecture",
    level: "advanced",
    kind: "conceptual",
    q: "Modular monolith vs microservices. When is OEMS-style split justified?",
    a: "Split when teams/deployments/scale independently (exam engine vs identity) OR a domain’s failure shouldn’t take down login. Cost: distributed transactions, observability, local docker compose, JWT, versioning. If 2 developers, a modular monolith (domains in folders, one DB) is faster. Interview answer: ‘start modular; extract when a bounded context has a reason’.",
  },
  {
    id: "h8",
    category: "Architecture",
    level: "advanced",
    kind: "conceptual",
    q: "Saga / eventual consistency: register student then create auth user in another service.",
    a: "You cannot JOIN across DBs. Pattern: create student → publish StudentRegistered event/queue → identity service creates login. Failure: retry + dead letter, or compensating ‘delete student’. Don’t wrap two HTTP calls in a MySQL transaction — it only covers one DB. Idempotent consumers are mandatory.",
  },
  {
    id: "h9",
    category: "Architecture",
    level: "intermediate",
    kind: "conceptual",
    q: "DDD words interviewers like: Entity, Value Object, Aggregate, Application Service.",
    a: "Entity: has id (Student). Value object: equality by value (Email, Money) — use casts. Aggregate: exam + questions saved together, invariants (can’t submit twice). Application service: ‘SubmitExam’ action. Don’t claim full DDD if your app is CRUD — say ‘I keep invariants in one place, not in the controller’.",
  },
  {
    id: "h10",
    category: "Architecture",
    level: "advanced",
    kind: "coding",
    q: "Thin controller: SubmitExamAction. Show the shape.",
    a: "Controller authorizes + validates. Action runs transaction + events.",
    code: `class ExamController
{
    public function submit(SubmitExamRequest $request, Exam $exam, SubmitExamAction $submit)
    {
        $this->authorize('submit', $exam);
        $attempt = $submit->handle($request->user(), $exam, $request->validated()['answers']);
        return new AttemptResource($attempt);
    }
}

class SubmitExamAction
{
    public function handle(User $student, Exam $exam, array $answers): ExamAttempt
    {
        return DB::transaction(function () use ($student, $exam, $answers) {
            $attempt = ExamAttempt::lockForUpdate()->where(...)->firstOrFail();
            // score, mark submitted, event
            ExamSubmitted::dispatch($attempt);
            return $attempt;
        });
    }
}`,
  },
  {
    id: "h11",
    category: "Architecture",
    level: "intermediate",
    kind: "conceptual",
    q: "CQRS lite: why separate ‘write submit exam’ from ‘read leaderboard’?",
    a: "Writes need transactions/locks. Reads can be denormalized tables or Redis sorted sets. You don’t need full CQRS. For leaderboard, a reporting table updated by a listener beats joining attempts every page load.",
  },

  // ─── PHP & OOP ────────────────────────────────────────────
  {
    id: "o1",
    category: "PHP & OOP",
    level: "basic",
    kind: "conceptual",
    q: "abstract class vs interface vs trait. Laravel examples.",
    a: "Interface: contract (ShouldQueue, Jsonable) — a class can implement many. Abstract class: shared implementation + abstract methods (Illuminate\\Database\\Eloquent\\Model is a class you extend). Trait: copy-paste with reuse (SoftDeletes, Notifiable) — no true is-a. Don’t use traits for business workflows; use services.",
  },
  {
    id: "o2",
    category: "PHP & OOP",
    level: "intermediate",
    kind: "conceptual",
    q: "SOLID in one Laravel sentence each.",
    a: "S: FormRequest/Policy/Action each one reason. O: add payment driver via interface, don’t edit a 500-line if-else. L: child gateways must honor PaymentGateway. I: don’t force SmsSender to implement sendFax. D: depend on SmsSender interface, bind Msg91 in provider. If you rattle all five with examples, you beat most 1y candidates.",
  },
  {
    id: "o3",
    category: "PHP & OOP",
    level: "intermediate",
    kind: "conceptual",
    q: "PHP 8 features you actually use in Laravel: constructor promo, named args, match, enums, nullsafe, union types.",
    a: "public function __construct(private ExamRepository $exams) {}. match($status) instead of switch. ExamStatus::Live enum in casts. $user?->school?->name. string|int rarely; prefer explicit. Readonly DTO classes. Don’t claim fibers/octane if you haven’t used them.",
    code: `$label = match ($exam->status) {
    ExamStatus::Live => 'Ongoing',
    ExamStatus::Closed => 'Closed',
    default => 'Draft',
};`,
  },
  {
    id: "o4",
    category: "PHP & OOP",
    level: "advanced",
    kind: "conceptual",
    q: "== vs ===, type juggling, and why request ids must be cast.",
    a: "\"10\" == 10 is true; \"10a\" == 10 is true in PHP (historic). Loose compare in where clauses is OK in SQL, but in PHP if ($id == $user->id) can be exploited with arrays in old PHP. Use === and (int) / dto. Laravel validates integer. Never switch($value) with loose 0/false bugs.",
  },
  {
    id: "o5",
    category: "PHP & OOP",
    level: "intermediate",
    kind: "coding",
    q: "Write a readonly DTO for CreateStudent instead of a bag of arrays.",
    a: "Stops ‘array keys?’ bugs between controller and service.",
    code: `readonly class CreateStudentData
{
    public function __construct(
        public string $name,
        public string $email,
        public int $schoolId,
        public ?string $grade = null,
    ) {}

    public static function fromRequest(StoreStudentRequest $r): self
    {
        $v = $r->validated();
        return new self($v['name'], $v['email'], $r->user()->school_id, $v['grade'] ?? null);
    }
}`,
  },
  {
    id: "o6",
    category: "PHP & OOP",
    level: "basic",
    kind: "conceptual",
    q: "PSR-12, type hints, return types — why interviews care.",
    a: "Readable, fewer bugs, better IDE. Always declare function foo(): void / ?User. Don’t mix styles. Laravel Pint is the default formatter now. Mentioning Pint/PHPStan is a plus even if you only ran them locally.",
  },
  {
    id: "o7",
    category: "PHP & OOP",
    level: "advanced",
    kind: "conceptual",
    q: "References, clone, and why serializing closures fails in queues.",
    a: "Closures cannot be serialized (unless Laravel SerializesModels / SerializesClosures with opcache tricks in some packages). That’s why jobs are classes. Objects in jobs: SerializesModels stores id. Resources (file handles) won’t survive. Design jobs as plain data + handle().",
  },
  {
    id: "o8",
    category: "PHP & OOP",
    level: "intermediate",
    kind: "conceptual",
    q: "Late static binding: static:: vs self::. Eloquent uses it.",
    a: "self:: is bound to the class where it’s written. static:: is the called class (Student::query() uses Student not Model). That’s how Model::create() returns the subclass. Interview trivia that shows you read the framework.",
  },

  // ─── Testing & Debugging ──────────────────────────────────
  {
    id: "t1",
    category: "Testing & Debugging",
    level: "basic",
    kind: "conceptual",
    q: "Feature vs unit vs browser tests in Laravel.",
    a: "Unit: one class, no HTTP, mock deps. Feature: HTTP to your app (login, JSON). Dusk: real browser. 1y sweet spot: feature tests for auth + one critical flow (submit exam). RefreshDatabase vs DatabaseTransactions: Refresh is cleaner with migrations; slower. Use sqlite in-memory only if it matches MySQL features (JSON, locks may differ).",
  },
  {
    id: "t2",
    category: "Testing & Debugging",
    level: "intermediate",
    kind: "coding",
    q: "Write a feature test: unauthenticated 401, other school 403, owner 200.",
    a: "actingAs, assertStatus, assertJsonPath.",
    code: `public function test_cannot_view_other_school_student(): void
{
    $a = User::factory()->admin()->create(['school_id' => 1]);
    $student = Student::factory()->create(['school_id' => 2]);

    $this->actingAs($a)
        ->getJson('/api/students/'.$student->id)
        ->assertForbidden();
}`,
  },
  {
    id: "t3",
    category: "Testing & Debugging",
    level: "advanced",
    kind: "coding",
    q: "Fake HTTP, events, and queues in a test.",
    a: "Prevents hitting real SMS/payment APIs.",
    code: `Http::fake([
    'api.msg91.com/*' => Http::response(['ok' => true], 200),
]);
Event::fake([ExamSubmitted::class]);
Queue::fake();

$this->postJson('/exams/1/submit', [...])->assertOk();

Event::assertDispatched(ExamSubmitted::class);
Queue::assertPushed(SendExamResultMail::class);
Http::assertSent(fn ($req) => $req->url() === '...');`,
  },
  {
    id: "t4",
    category: "Testing & Debugging",
    level: "intermediate",
    kind: "conceptual",
    q: "How do you debug ‘it works on my machine’ in Laravel?",
    a: "Match PHP version, .env, config:clear, dump routes, Telescope/Debugbar locally, log channel daily, dd() / dump / ray. Production: APP_DEBUG=false, look at storage/logs/laravel.log, request id. Check queue worker was restarted. Check mysql timezone vs app timezone (UTC). Case-sensitive table names on Linux vs Windows.",
  },
  {
    id: "t5",
    category: "Testing & Debugging",
    level: "advanced",
    kind: "conceptual",
    q: "N+1 test: assert no lazy loading. How?",
    a: "Model::preventLazyLoading() in AppServiceProvider for local AND phpunit. A test that hits an endpoint will fail if a Resource touches a missing relation. That’s better than finding it in production. Pair with with() in the controller.",
  },
  {
    id: "t6",
    category: "Testing & Debugging",
    level: "basic",
    kind: "coding",
    q: "Factory states: admin vs student.",
    a: "Keep factories realistic; don’t couple to production seed emails.",
    code: `class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => 'password',
            'role' => 'student',
        ];
    }

    public function admin(): static
    {
        return $this->state(['role' => 'admin']);
    }
}`,
  },

  // ─── Redis, Docker & Ops ──────────────────────────────────
  {
    id: "s1",
    category: "Redis, Docker & Ops",
    level: "intermediate",
    kind: "conceptual",
    q: "What do you use Redis for in Laravel? Separate DBs/prefixes?",
    a: "Cache, sessions, queues, rate limiter, locks, broadcasting. Use different Redis databases or prefixes (cache vs queue) so flushall on cache doesn’t wipe the queue. Horizon on Redis. Persistence (AOF/RDB) matters if Redis holds the only copy of a queue.",
  },
  {
    id: "s2",
    category: "Redis, Docker & Ops",
    level: "advanced",
    kind: "conceptual",
    q: "Docker: why php-fpm + nginx + queue worker are different containers?",
    a: "Different process types, scale independently (3 workers, 1 fpm). Shared code via image. Env via env_file. Network: app talks to mysql/redis by service name. Gotcha: queue worker image must be same code as fpm. File uploads: shared volume or S3. Windows volume perf issues locally.",
  },
  {
    id: "s3",
    category: "Redis, Docker & Ops",
    level: "intermediate",
    kind: "conceptual",
    q: "12-factor: config in env, logs to stdout, disposability of workers.",
    a: "Laravel maps this: .env, logging channels, queue:restart. Don’t store uploads only on container FS. Don’t rely on cron inside a random web replica — one scheduler replica or k8s CronJob. Healthcheck /up (Laravel 11).",
  },
  {
    id: "s4",
    category: "Redis, Docker & Ops",
    level: "advanced",
    kind: "conceptual",
    q: "Zero-downtime deploy checklist for Laravel.",
    a: "1) Build assets. 2) Put app in maintenance if needed (or rolling). 3) php artisan migrate --force (expand/contract). 4) config/route/view cache. 5) php artisan queue:restart / horizon:terminate. 6) reload php-fpm. 7) warm cache. Never migrate:fresh. Back up DB. Watch failed_jobs after deploy.",
  },
  {
    id: "s5",
    category: "Redis, Docker & Ops",
    level: "basic",
    kind: "conceptual",
    q: "storage:link — why images 404 after deploy.",
    a: "public/storage must symlink to storage/app/public. In Docker the link is inside the container and may be missing. Don’t git the symlink wrongly on Windows. For multi-node, use S3. FILESYSTEM_DISK=public vs s3.",
  },
  {
    id: "s6",
    category: "Redis, Docker & Ops",
    level: "intermediate",
    kind: "coding",
    q: "Health endpoint that checks DB + Redis without leaking internals.",
    a: "Return 503 if down. Don’t print passwords.",
    code: `Route::get('/health', function () {
    try {
        DB::select('select 1');
        Cache::store('redis')->get('health-ping');
        return response()->json(['status' => 'ok']);
    } catch (\\Throwable $e) {
        report($e);
        return response()->json(['status' => 'degraded'], 503);
    }
});`,
  },
  {
    id: "s7",
    category: "Redis, Docker & Ops",
    level: "advanced",
    kind: "conceptual",
    q: "MySQL timezone, Laravel timezone, Carbon::now() vs now().",
    a: "Keep app timezone UTC in config, convert in UI. Mixing IST in MySQL TIMESTAMP vs Laravel datetime can shift exam start_at by 5:30. TIMESTAMP is UTC internally in MySQL; DATETIME is naive. Be consistent. now() is Carbon alias. Storage: UTC. Display: user locale.",
  },

  // ─── More coding problems ─────────────────────────────────
  {
    id: "d21",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Write SQL/Eloquent: top 3 students per school by average exam score.",
    a: "Window functions if MySQL 8, or subquery. Interviewers love this.",
    code: `// MySQL 8
SELECT * FROM (
  SELECT student_id, school_id, AVG(score) avg_score,
         ROW_NUMBER() OVER (PARTITION BY school_id ORDER BY AVG(score) DESC) rn
  FROM exam_student
  GROUP BY student_id, school_id
) t WHERE rn <= 3;

// Eloquent-ish: per school in PHP after grouped query, or raw
DB::select($sql);`,
  },
  {
    id: "d22",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Output? Then fix. User::where('active', 1)->update(['active' => 0]); does observers run?",
    a: "No. Query builder mass update skips model events, casts mutators, timestamps unless you include them. Fix: chunk models and $user->update(), or dispatch a job, or document that observers won’t fire and do the side effect explicitly.",
  },
  {
    id: "d23",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Implement find-or-create enrollment that cannot double-enroll under concurrency.",
    a: "Unique (exam_id, student_id) + catch QueryException 23000, or lock parent exam row.",
    code: `try {
    return Enrollment::create([
        'exam_id' => $examId,
        'student_id' => $studentId,
    ]);
} catch (QueryException $e) {
    if ($e->getCode() === '23000') {
        return Enrollment::where('exam_id', $examId)
            ->where('student_id', $studentId)
            ->firstOrFail();
    }
    throw $e;
}`,
  },
  {
    id: "d24",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Search students: escape LIKE wildcards so % in name isn’t a wildcard.",
    a: "User input ‘a%’ shouldn’t match everyone.",
    code: `$term = addcslashes($request->get('search'), '%_\\\\');
Student::where('name', 'like', "%{$term}%")->get();`,
  },
  {
    id: "d25",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Policy for ‘start exam’: window, already submitted, assigned batch, school.",
    a: "Put ALL invariants in one place so controllers don’t drift.",
    code: `public function start(User $user, Exam $exam): bool
{
    if ($user->school_id !== $exam->school_id) return false;
    if ($exam->status !== 'live') return false;
    if (now()->lt($exam->start_at) || now()->gt($exam->end_at)) return false;
    if ($exam->batch && $user->grade !== $exam->batch) return false;
    if ($exam->attempts()->where('student_id', $user->id)->whereNotNull('submitted_at')->exists()) {
        return false;
    }
    return true;
}`,
  },
  {
    id: "d26",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Transform this N+1 Resource. What’s missing in the controller?",
    a: "StudentResource uses $this->school->name and $this->exams->count(). Controller must with('school') and withCount('exams').",
    code: `// Controller
$students = Student::with('school')->withCount('exams')->paginate();

// Resource
'school' => $this->whenLoaded('school', fn () => $this->school->name),
'exams_count' => $this->whenCounted('exams'),`,
  },
  {
    id: "d27",
    category: "Coding Problems",
    level: "basic",
    kind: "coding",
    q: "Write a seeder that doesn’t duplicate if run twice.",
    a: "firstOrCreate / updateOrCreate on a unique key.",
    code: `Role::firstOrCreate(['name' => 'admin']);
User::updateOrCreate(
    ['email' => 'admin@school.test'],
    ['name' => 'Admin', 'password' => Hash::make('secret'), 'school_id' => 1]
);`,
  },
  {
    id: "d28",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "CSV export of 100k students without exhausting memory.",
    a: "StreamedResponse + cursor/lazyById. Don’t fputcsv an all() collection.",
    code: `return response()->streamDownload(function () {
    $out = fopen('php://output', 'w');
    fputcsv($out, ['id', 'name', 'email']);
    Student::query()->orderBy('id')->cursor()->each(function ($s) use ($out) {
        fputcsv($out, [$s->id, $s->name, $s->email]);
    });
    fclose($out);
}, 'students.csv');`,
  },
  {
    id: "d29",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Custom validation: exam duration minutes must match end_at - start_at (±1 min).",
    a: "after() closure comparing Carbon diffs.",
    code: `$validator->after(function ($v) {
    $start = Carbon::parse($this->start_at);
    $end = Carbon::parse($this->end_at);
    if (abs($end->diffInMinutes($start) - (int) $this->duration) > 1) {
        $v->errors()->add('duration', 'Duration does not match start/end.');
    }
});`,
  },
  {
    id: "d30",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Redis lock around ‘generate hall tickets’ so two admins don’t run it.",
    a: "Cache::lock, block wait, release in finally.",
    code: `$lock = Cache::lock('hall-tickets:'.$schoolId, 120);

if (! $lock->get()) {
    abort(409, 'Already generating');
}

try {
    GenerateHallTickets::dispatchSync($schoolId);
} finally {
    $lock->release();
}`,
  },
  {
    id: "d31",
    category: "Coding Problems",
    level: "basic",
    kind: "conceptual",
    q: "What does old() do and why is it empty on API?",
    a: "old() reads flashed session input after a redirect from ValidationException. APIs don’t redirect; they get 422 JSON. SPAs must re-bind errors from JSON. For Blade, old('email') + @error is the pattern. After successful POST, redirect GET (PRG) so refresh doesn’t resubmit.",
  },
  {
    id: "d32",
    category: "Coding Problems",
    level: "advanced",
    kind: "conceptual",
    q: "How would you design OTP login (email) securely?",
    a: "6-digit crypto random, store HASH not plaintext, 5 min TTL, max 5 attempts, throttle send 1/min, single use, invalidate on success, don’t leak ‘email not found’ if you care. Job for sending. Same generic response always. Bind OTP to purpose+email. HTTPS only.",
  },
  {
    id: "d33",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Eloquent: students missing any attempt in a given exam (anti-join).",
    a: "whereDoesntHave.",
    code: `Student::where('school_id', $schoolId)
    ->whereDoesntHave('attempts', fn ($q) => $q->where('exam_id', $examId))
    ->get();`,
  },
  {
    id: "d34",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Implement a simple Circuit: if downstream school service fails 5 times, stop calling for 30s.",
    a: "Redis counters. Shows you think about microservices.",
    code: `$key = 'cb:school';
$opens = (int) Cache::get($key.':fails', 0);
if ($opens >= 5) {
    throw new ServiceUnavailableHttpException(30, 'School service down');
}
try {
    return Http::timeout(3)->get($url)->throw()->json();
} catch (\\Throwable $e) {
    Cache::add($key.':fails', 0, 30);
    Cache::increment($key.':fails');
    throw $e;
}`,
  },
  {
    id: "d35",
    category: "Coding Problems",
    level: "intermediate",
    kind: "conceptual",
    q: "Why Hash::make every time gives different strings but check still works?",
    a: "bcrypt/argon include a random salt in the hash. Each make() is different. Check extracts salt from stored hash and re-hashes. That’s why you store the hash, never compare Hash::make($plain) === $stored.",
  },
  {
    id: "d36",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Write a database transaction isolation note: can a second request see uncommitted exam submit?",
    a: "Default REPEATABLE READ (MySQL InnoDB). Uncommitted data is not visible (no dirty read). Phantom/next-key locking with FOR UPDATE. If you need to count seats, lock the exam row first then insert attempt. Explain dirty/non-repeatable/phantom in one line each if asked.",
  },
  {
    id: "d37",
    category: "Coding Problems",
    level: "basic",
    kind: "coding",
    q: "Route model binding with a custom column uuid.",
    a: "getRouteKeyName or explicit bind.",
    code: `// Model
public function getRouteKeyName(): string
{
    return 'uuid';
}

Route::get('/exams/{exam}', ...); // {exam} looks up uuid`,
  },
  {
    id: "d38",
    category: "Coding Problems",
    level: "intermediate",
    kind: "coding",
    q: "Observer vs Event: ‘when student created, also create login’. Which, and how to not loop?",
    a: "Observer created() can dispatch CreateIdentityJob (async, retry). Don’t User::create inside UserObserver creating another user. Disable observer with User::withoutEvents() during imports. Prefer explicit action in a service for critical identity flows so imports can skip emails.",
  },
  {
    id: "d39",
    category: "Coding Problems",
    level: "advanced",
    kind: "coding",
    q: "Give a complete unique-update validation for email that is also soft-deleted.",
    a: "If unique index includes deleted rows, restore or force-delete first. Rule::unique()->whereNull('deleted_at') if you allow reuse of deleted emails (product decision).",
    code: `Rule::unique('users', 'email')
    ->whereNull('deleted_at')
    ->ignore($user->id);`,
  },
  {
    id: "d40",
    category: "Coding Problems",
    level: "intermediate",
    kind: "conceptual",
    q: "Live exam: store answers periodically. PUT vs POST vs debounce. Conflicts.",
    a: "Autosave PUT /attempts/{id}/answers with last-write-wins or version. Debounce 5s on client. Server: authorize owner, exam still live, not submitted. Don’t create a new attempt row every keystroke. Index (attempt_id). Payload size limits. Queue scoring only on final submit.",
  },

  // ─── SQL ──────────────────────────────────────────────────
  {
    id: "sql1",
    category: "SQL",
    level: "basic",
    kind: "conceptual",
    q: "INNER JOIN vs LEFT JOIN vs RIGHT JOIN — what rows come back?",
    a: "1) INNER JOIN: only rows that match in BOTH tables. 2) LEFT JOIN: ALL rows from the left table; right side is NULL if no match. 3) RIGHT JOIN: ALL rows from the right table; left side NULL if no match. Interview: students with no exam → LEFT JOIN exams, then WHERE exams.id IS NULL.",
    code: `-- Inner: only students who have a school
SELECT s.name, sch.name
FROM students s
INNER JOIN schools sch ON sch.id = s.school_id;

-- Left: all students, even if school row is missing
SELECT s.name, sch.name
FROM students s
LEFT JOIN schools sch ON sch.id = s.school_id;`,
  },
  {
    id: "sql2",
    category: "SQL",
    level: "basic",
    kind: "coding",
    q: "Write SQL: all students of school 5 with their grade.",
    a: "Filter in WHERE. Don’t put school_id in JOIN unless it is the join key.",
    code: `SELECT id, name, email, grade
FROM students
WHERE school_id = 5
ORDER BY name;`,
  },
  {
    id: "sql3",
    category: "SQL",
    level: "intermediate",
    kind: "coding",
    q: "Write SQL: students who never attempted exam 10.",
    a: "1) LEFT JOIN attempts and keep rows where attempt id is NULL. 2) Or NOT EXISTS (usually faster / clearer). Interview: NOT EXISTS often beats NOT IN when NULLs exist.",
    code: `SELECT s.id, s.name
FROM students s
LEFT JOIN exam_attempts a
  ON a.student_id = s.id AND a.exam_id = 10
WHERE a.id IS NULL;

-- clearer
SELECT s.id, s.name
FROM students s
WHERE NOT EXISTS (
  SELECT 1
  FROM exam_attempts a
  WHERE a.student_id = s.id
    AND a.exam_id = 10
);`,
  },
  {
    id: "sql4",
    category: "SQL",
    level: "intermediate",
    kind: "conceptual",
    q: "WHERE vs HAVING. Why can’t you put COUNT in WHERE?",
    a: "1) WHERE filters rows BEFORE grouping. 2) HAVING filters AFTER GROUP BY (aggregates). 3) COUNT/SUM are not available yet in WHERE. Example: schools that have more than 50 students → GROUP BY school_id HAVING COUNT(*) > 50.",
    code: `SELECT school_id, COUNT(*) AS total
FROM students
WHERE is_active = 1          -- row filter first
GROUP BY school_id
HAVING COUNT(*) > 50;        -- group filter after`,
  },
  {
    id: "sql5",
    category: "SQL",
    level: "basic",
    kind: "conceptual",
    q: "PRIMARY KEY vs UNIQUE vs INDEX.",
    a: "1) PRIMARY KEY: unique + NOT NULL + one per table (usually id). 2) UNIQUE: no duplicate values; NULL allowed (MySQL: multiple NULLs). 3) INDEX: speed up WHERE/JOIN/ORDER BY; values can repeat. Interview: unique(school_id, email) is a COMPOSITE unique — same email can exist in another school.",
    code: `ALTER TABLE students
  ADD PRIMARY KEY (id);

ALTER TABLE students
  ADD UNIQUE KEY students_school_email (school_id, email);

ALTER TABLE exam_attempts
  ADD INDEX attempts_exam_student (exam_id, student_id);`,
  },
  {
    id: "sql6",
    category: "SQL",
    level: "intermediate",
    kind: "coding",
    q: "Write SQL: each school’s student count and average score.",
    a: "JOIN + GROUP BY the non-aggregated columns. If you SELECT sch.name, you must GROUP BY sch.id (and name) too.",
    code: `SELECT
  sch.id,
  sch.name,
  COUNT(DISTINCT s.id) AS students,
  AVG(es.score) AS avg_score
FROM schools sch
LEFT JOIN students s ON s.school_id = sch.id
LEFT JOIN exam_student es ON es.student_id = s.id
GROUP BY sch.id, sch.name
ORDER BY avg_score DESC;`,
  },
  {
    id: "sql7",
    category: "SQL",
    level: "advanced",
    kind: "conceptual",
    q: "IN vs EXISTS vs JOIN for ‘students who have at least one live exam’.",
    a: "1) IN (SELECT exam.student_id …) can get slow / NULL-weird. 2) EXISTS stops at first match — best for ‘at least one’. 3) JOIN can DUPLICATE the student if they have 3 exams — use DISTINCT or EXISTS. Prefer EXISTS for existence checks.",
    code: `SELECT s.*
FROM students s
WHERE EXISTS (
  SELECT 1
  FROM exam_student es
  JOIN exams e ON e.id = es.exam_id
  WHERE es.student_id = s.id
    AND e.status = 'live'
);`,
  },
  {
    id: "sql8",
    category: "SQL",
    level: "intermediate",
    kind: "conceptual",
    q: "COUNT(*) vs COUNT(column) vs COUNT(DISTINCT col).",
    a: "1) COUNT(*): all rows in the group, including NULL columns. 2) COUNT(email): rows where email is NOT NULL. 3) COUNT(DISTINCT school_id): unique values, ignores NULL. Trap: COUNT(score) skips students with NULL score, so average-related counts look smaller.",
    code: `SELECT
  COUNT(*) AS rows,
  COUNT(score) AS with_score,
  COUNT(DISTINCT student_id) AS unique_students
FROM exam_student;`,
  },
  {
    id: "sql9",
    category: "SQL",
    level: "advanced",
    kind: "coding",
    q: "Write SQL: top 3 students per school by average score (MySQL 8 window).",
    a: "1) Compute AVG per student. 2) ROW_NUMBER() PARTITION BY school_id ORDER BY avg DESC. 3) Keep rn <= 3. Interview: RANK() gives ties the same rank; ROW_NUMBER() always unique.",
    code: `SELECT school_id, student_id, avg_score
FROM (
  SELECT
    s.school_id,
    es.student_id,
    AVG(es.score) AS avg_score,
    ROW_NUMBER() OVER (
      PARTITION BY s.school_id
      ORDER BY AVG(es.score) DESC
    ) AS rn
  FROM exam_student es
  JOIN students s ON s.id = es.student_id
  GROUP BY s.school_id, es.student_id
) t
WHERE rn <= 3;`,
  },
  {
    id: "sql10",
    category: "SQL",
    level: "basic",
    kind: "conceptual",
    q: "DELETE vs TRUNCATE vs DROP.",
    a: "1) DELETE: removes rows, can WHERE, can rollback in a transaction, fires row deletes. 2) TRUNCATE: empty the table fast, usually cannot WHERE, resets AUTO_INCREMENT, DDL in MySQL (careful with rollback). 3) DROP: removes the table itself. Never TRUNCATE production if you need a WHERE or FK checks.",
  },
  {
    id: "sql11",
    category: "SQL",
    level: "intermediate",
    kind: "coding",
    q: "Write SQL: exams overlapping a time window (start_at / end_at).",
    a: "Two ranges overlap if A.start < B.end AND A.end > B.start. Use this for ‘cannot create two live exams in same slot’.",
    code: `SELECT id, title, start_at, end_at
FROM exams
WHERE school_id = 5
  AND start_at < '2026-04-10 12:00:00'
  AND end_at   > '2026-04-10 10:00:00';`,
  },
  {
    id: "sql12",
    category: "SQL",
    level: "advanced",
    kind: "conceptual",
    q: "What does EXPLAIN type=ALL mean? How do you fix it?",
    a: "1) type=ALL is a full table scan. 2) Extra ‘Using filesort’ / ‘Using temporary’ is extra cost. 3) Fix: index columns in WHERE, JOIN, ORDER BY. 4) Composite index (school_id, created_at) helps WHERE school_id = ? ORDER BY created_at. 5) LIKE '%name' cannot use a normal b-tree prefix index.",
    code: `EXPLAIN SELECT * FROM students
WHERE school_id = 5 AND grade = '10-A';

-- useful index
CREATE INDEX students_school_grade ON students (school_id, grade);`,
  },
  {
    id: "sql13",
    category: "SQL",
    level: "basic",
    kind: "coding",
    q: "Write SQL: update grade for selected student ids, only inside one school.",
    a: "Always scope school_id so you cannot update another tenant’s rows.",
    code: `UPDATE students
SET grade = '10-A'
WHERE school_id = 5
  AND id IN (11, 12, 15);`,
  },
  {
    id: "sql14",
    category: "SQL",
    level: "intermediate",
    kind: "conceptual",
    q: "NULL behaviour: why WHERE score != 40 misses NULL scores?",
    a: "1) NULL means unknown, not 0. 2) NULL != 40 is NULL, not TRUE, so the row is dropped. 3) Use WHERE score != 40 OR score IS NULL if you want them. 4) NOT IN (SELECT col) is dangerous if subquery returns NULL — whole NOT IN becomes unknown. Prefer NOT EXISTS.",
    code: `SELECT * FROM exam_student
WHERE score IS NULL;

SELECT * FROM exam_student
WHERE score != 40 OR score IS NULL;`,
  },
  {
    id: "sql15",
    category: "SQL",
    level: "advanced",
    kind: "coding",
    q: "Write SQL: prevent double submit using a unique key + insert.",
    a: "1) Unique (exam_id, student_id) on attempts. 2) INSERT. 3) If duplicate, catch 1062 / ON DUPLICATE. DB is the real lock; PHP if-check is not enough under two parallel requests.",
    code: `ALTER TABLE exam_attempts
  ADD UNIQUE KEY attempts_exam_student (exam_id, student_id);

INSERT INTO exam_attempts (exam_id, student_id, submitted_at)
VALUES (10, 55, NOW());
-- second request: duplicate key error → treat as already submitted`,
  },
  {
    id: "sql16",
    category: "SQL",
    level: "intermediate",
    kind: "coding",
    q: "Write SQL: last attempt date per student (without N+1).",
    a: "GROUP BY or a correlated subquery. Same idea as Eloquent withMax.",
    code: `SELECT student_id, MAX(created_at) AS last_attempt_at
FROM exam_attempts
GROUP BY student_id;

-- with student name
SELECT s.id, s.name, MAX(a.created_at) AS last_attempt_at
FROM students s
LEFT JOIN exam_attempts a ON a.student_id = s.id
GROUP BY s.id, s.name;`,
  },
  {
    id: "sql17",
    category: "SQL",
    level: "basic",
    kind: "conceptual",
    q: "UNION vs UNION ALL.",
    a: "1) UNION: merge results and REMOVE duplicates (extra sort/unique cost). 2) UNION ALL: keep duplicates, faster. Use UNION ALL unless you truly need unique rows.",
    code: `SELECT email FROM admins
UNION ALL
SELECT email FROM students;`,
  },
  {
    id: "sql18",
    category: "SQL",
    level: "advanced",
    kind: "conceptual",
    q: "Transaction + COMMIT/ROLLBACK. What is ACID in one line each?",
    a: "1) Atomic: all statements succeed or none. 2) Consistent: constraints stay valid. 3) Isolated: other sessions don’t see half-written data. 4) Durable: after COMMIT, a crash does not lose it. Laravel DB::transaction() starts, commits, or rolls back on exception.",
    code: `START TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
-- on error: ROLLBACK;`,
  },
  {
    id: "sql19",
    category: "SQL",
    level: "intermediate",
    kind: "coding",
    q: "Write SQL: pivot — how many students per grade in a school.",
    a: "GROUP BY grade. Optional CASE for columns (10-A, 10-B as columns).",
    code: `SELECT grade, COUNT(*) AS total
FROM students
WHERE school_id = 5
GROUP BY grade
ORDER BY total DESC;

-- pivot columns
SELECT
  COUNT(CASE WHEN grade = '10-A' THEN 1 END) AS grade_10a,
  COUNT(CASE WHEN grade = '10-B' THEN 1 END) AS grade_10b
FROM students
WHERE school_id = 5;`,
  },
  {
    id: "sql20",
    category: "SQL",
    level: "advanced",
    kind: "conceptual",
    q: "Offset pagination problem. Why page 500 is slow?",
    a: "1) LIMIT 20 OFFSET 10000 still scans/skips 10000 rows. 2) Fix: keyset/cursor — WHERE id > last_id ORDER BY id LIMIT 20. 3) Laravel cursorPaginate() does this. Use OFFSET only for small admin pages.",
    code: `-- slow
SELECT * FROM students ORDER BY id LIMIT 20 OFFSET 10000;

-- fast keyset
SELECT * FROM students
WHERE id > 10420
ORDER BY id
LIMIT 20;`,
  },
  {
    id: "sql21",
    category: "SQL",
    level: "intermediate",
    kind: "coding",
    q: "Write SQL: self join — students with the same email in two schools (data bug).",
    a: "Join the table to itself on email, different school_id.",
    code: `SELECT a.id, a.school_id, b.id AS other_id, b.school_id AS other_school, a.email
FROM students a
JOIN students b
  ON a.email = b.email
 AND a.school_id < b.school_id;`,
  },
  {
    id: "sql22",
    category: "SQL",
    level: "basic",
    kind: "conceptual",
    q: "SELECT * is bad in production APIs. Why?",
    a: "1) Pulls unused columns (password hash, blobs). 2) More memory and network. 3) Breaks when you add a heavy column later. 4) Eloquent: ->select('id','name') but don’t save that partial model blindly. APIs should list explicit columns / Resources.",
    code: `SELECT id, name, grade
FROM students
WHERE school_id = 5;`,
  },
  {
    id: "sql23",
    category: "SQL",
    level: "advanced",
    kind: "coding",
    q: "Write SQL: decrement seats only if seats_left > 0 (race-safe).",
    a: "One UPDATE with WHERE seats_left > 0. Check ROW_COUNT(). Two parallel requests: only one succeeds if there was 1 seat.",
    code: `UPDATE exams
SET seats_left = seats_left - 1
WHERE id = 10
  AND seats_left > 0;

-- in PHP: if affected rows = 0 → exam full`,
  },
  {
    id: "sql24",
    category: "SQL",
    level: "intermediate",
    kind: "conceptual",
    q: "Foreign key ON DELETE CASCADE vs RESTRICT. Soft deletes?",
    a: "1) CASCADE: deleting school deletes students. 2) RESTRICT/NO ACTION: delete school fails if students exist. 3) SET NULL: student.school_id becomes NULL. 4) Soft delete does NOT fire ON DELETE because the parent row is still there. You must handle children in app code.",
    code: `ALTER TABLE students
  ADD CONSTRAINT students_school_id_fk
  FOREIGN KEY (school_id) REFERENCES schools(id)
  ON DELETE CASCADE;`,
  },
  {
    id: "sql25",
    category: "SQL",
    level: "basic",
    kind: "coding",
    q: "Write the SQL Laravel would run for Student::with('school')->get() — the N+1 vs eager idea.",
    a: "1) Bad: 1 query for students, then 1 query PER student for school. 2) Good: 1 query students, 1 query schools WHERE id IN (...). That second IN (...) is eager loading.",
    code: `-- query 1
SELECT * FROM students;

-- N+1 (bad)
SELECT * FROM schools WHERE id = 1;
SELECT * FROM schools WHERE id = 1;
SELECT * FROM schools WHERE id = 2;

-- eager (good)
SELECT * FROM schools WHERE id IN (1, 2, 5);`,
  },
];

